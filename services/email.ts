
import { GoogleGenAI } from "@google/genai";
import { EmailMessage, CartItem, Currency } from "../types";
import { CURRENCY_CONFIG, CONTACT_INFO } from "../constants";

/**
 * Danks lite Email Delivery System (Transactional)
 * Uses Gemini 3 Flash for digital invoice styling
 * Uses EmailJS for relaying receipts to external addresses
 */

const EMAILJS_PUBLIC_KEY = "v_T7uHhP6vS-8H-p9"; 
const EMAILJS_SERVICE_ID = "default_service";
const EMAILJS_TEMPLATE_ID = "template_dankslite";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const dispatchRealEmail = async (to_email: string, subject: string, html_body: string) => {
  try {
    const emailjs = (window as any).emailjs;
    if (emailjs) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      const templateParams = {
        to_email: to_email,
        subject: subject,
        message_html: html_body,
        from_name: "Danks lite Limited",
        reply_to: "sales@dankslite.com",
        location: CONTACT_INFO.address,
        phone: CONTACT_INFO.phones[0]
      };
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      return true;
    }
  } catch (err) {
    console.error("[Danks lite SMTP] Transactional Delivery Error:", err);
  }
  return false;
};

export const generateOrderEmail = async (
  email: string, 
  items: CartItem[], 
  total: number, 
  currency: Currency,
  orderId: string
): Promise<Partial<EmailMessage>> => {
  const config = CURRENCY_CONFIG[currency];
  const itemsList = items.map(i => `${i.quantity}x ${i.name} (${config.symbol}${(i.price * config.rate).toFixed(2)})`).join(', ');
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a premium digital receipt HTML for Danks lite Limited.
      Order ID: ${orderId}.
      Customer: ${email}.
      Total Amount: ${config.symbol}${(total * config.rate).toLocaleString()}.
      Purchased Items: ${itemsList}.
      Company Info: Obuasi Municipal, Ghana. Contacts: +233 54 077 0102, +233 50 192 4256.
      Design: Elegant invoice style with a violet theme. 
      Return ONLY the raw HTML string without markdown blocks.`,
    });
    
    const htmlBody = response.text.replace(/^```html\n|```$/g, '').trim();
    await dispatchRealEmail(email, `Danks lite: Order Confirmed ${orderId}`, htmlBody);

    return {
      subject: `Order Confirmation: ${orderId}`,
      body: htmlBody,
      type: 'ORDER'
    };
  } catch (error) {
    const fallback = `<div>Thank you for your order ${orderId} at Danks lite Limited!</div>`;
    await dispatchRealEmail(email, "Order Confirmation", fallback);
    return {
      subject: `Order Confirmation ${orderId}`,
      body: fallback,
      type: 'ORDER'
    };
  }
};
