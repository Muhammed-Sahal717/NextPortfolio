import FooterHeader from "./FooterHeader";
import ContactForm from "./ContactForm";
import FooterNav from "./FooterNav";

export default function Footer() {
  return (
    <footer
      className="bg-background text-foreground relative border-t border-border flex flex-col justify-between pt-16 md:pt-24"
      id="contact"
    >
      <div className="w-full max-w-[100rem] mx-auto px-6 lg:px-16 flex flex-col gap-16 md:gap-24">
        {/* Header Section */}
        <FooterHeader />

        {/* Main Content: Form & Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <ContactForm />
          <FooterNav />
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="w-full max-w-[100rem] mx-auto border-t border-border py-8 px-6 lg:px-16 flex justify-between items-center text-sm text-muted-foreground mt-24">
         <p>© {new Date().getFullYear()} Sahal.</p>
         <p>All rights reserved.</p>
      </div>
    </footer>
  );
}
