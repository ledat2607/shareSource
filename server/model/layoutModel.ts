import { Document, Model, Schema, model } from "mongoose";

 interface FaqItem extends Document {
   question: string;
   answer: string;
 }
 interface Category extends Document{
    title:string,
 }

 interface BannerImg extends Document{
    public_id:string,
    url:string,
 }

 interface Layout extends Document {
   type: string;
   faq: FaqItem[];
   category: Category[];
   banner: {
     image: BannerImg;
     title: string;
     subTitle: string;
   };
 }

 const faqSchema = new Schema<FaqItem>({
   question: { type: String },
   answer: { type: String },
 });

 const categorySchema = new Schema<Category>({
   title: { type: String },
 });

 const BannerSchema = new Schema<BannerImg>({
   public_id: { type: String },
   url: { type: String },
 });

 const layoutSchema = new Schema<Layout>({
   type: { type: String },
   faq: [faqSchema],
   category: [categorySchema],
   banner: {
     image: BannerSchema,
     title: { type: String },
     subTitle: { type: String },
   },
 });

 const layoutModel = model<Layout>("Layout", layoutSchema);

 export default layoutModel;

