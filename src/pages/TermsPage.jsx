// TermsPage — displays the full Terms of Use for Loan Fair Pty Ltd.
// Linked from the footer. Static content, no interactivity.
import { useScrollReveal } from '../hooks/useScrollReveal'
import './PrivacyPage.css' // reuses the same layout styles as the Privacy page

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero privacy-hero">
        <div className="container">
          <p className="page-hero__label">Legal</p>
          <h1 className="page-hero__headline">Terms of Use</h1>
          <p className="page-hero__sub">
            Loan Fair Pty Ltd (ABN 82 696 091 924) — registered in Victoria, Australia.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="privacy-body bg-green-dark section-padding">
        <div className="container privacy-body__inner">

          {/* Preamble */}
          <TermsSection>
            <p>
              Welcome to the Loan Fair Pty Ltd ("Company") website ("Website"). Loan Fair Pty Ltd
              (ABN 82 696 091 924) operates this Website, with the registered office located in Victoria.
              In these Terms of Use, "we," "our," and "us" refer to Loan Fair Pty Ltd.
            </p>
          </TermsSection>

          {/* 1. Introduction */}
          <TermsSection title="1. Introduction">
            <p>1.1. By accessing and using this Website, you agree to comply with these Terms of Use. If you do not agree, you are no longer permitted to access or use this Website.</p>
            <p>1.2. Violation of these Terms of Use will result in the immediate revocation of your right to access and use this Website.</p>
            <p>1.3. This Website is intended for Australian residents aged 18 years and over. The content, including products and prices, is frequently updated. Products may be withdrawn at any time without notice.</p>
            <p>1.4. We may amend these Terms of Use at any time. The amended Terms will be effective upon posting on this Website. Continued use of the Website constitutes acceptance of the amended Terms.</p>
            <p>1.5. Information presented on this website is based off generalisations. Any advice given does not take into account your objectives, financial situation or needs so please consider whether it is appropriate for you. Subject to suitability. Finance available to approved applicants only. Credit criteria, fees and charges apply. Terms and conditions available on request.</p>
            <p>1.6. *Loan Fair Pty Ltd obtains your loan estimate via making a request to a credit reporting body to access your credit reporting information. In order to do this, Loan Fair Pty Ltd will first submit your personal information to the credit reporting body and will be acting as an "Access Seeker" to make the request. The process of obtaining your loan estimate will NOT impact your credit score. Proceeding with your loan estimate for approval with any particular lender may result in a formal credit enquiry.</p>
          </TermsSection>

          {/* 2. Privacy Policy */}
          <TermsSection title="2. Privacy Policy">
            <p>2.1. We prioritize your privacy. Please refer to our Privacy Policy to understand how we use, store, and transfer your information. Use of this Website is subject to our Privacy Policy.</p>
          </TermsSection>

          {/* 3. Third Party Products */}
          <TermsSection title="3. Third Party Products">
            <p>3.1. This Website offers access to products provided by third parties. We do not control these third parties. Verify and satisfy your personal preferences and requirements before applying for or obtaining any product. Consult relevant product disclosure statements before making a purchase.</p>
            <p>3.2. All prices are in Australian dollars (AUD $).</p>
            <p>3.3. We are not liable for any loss or damages incurred in connection with products obtained through this Website.</p>
            <p>3.4. Product statements on this Website are summaries for comparison purposes. Confirm the precise terms of any product prior to purchase. Information is available to Australian residents only, unless otherwise stated.</p>
            <p>3.5. Submitting personal details through this Website allows you to make an offer to obtain a product from a third party. Acceptance of your offer by the third party forms a contract, subject to their terms and conditions. You will receive confirmation if your offer is accepted.</p>
          </TermsSection>

          {/* 4. The Service and How We Are Paid */}
          <TermsSection title="4. The Loan Fair Pty Ltd Service and How We Are Paid">
            <p>4.1. We provide services to research and compare life insurance, car insurance, loans, energy, broadband products, and credit cards from third parties.</p>
            <p>4.2. Our comparison service is free to use, subject to these Terms of Use. We receive commission from third party providers if you successfully purchase a product.</p>
          </TermsSection>

          {/* 5. Permitted Use */}
          <TermsSection title="5. Permitted Use">
            <p>5.1. You may use this Website for personal use only, in compliance with these Terms of Use. Commercial use is prohibited.</p>
            <p>5.2. Do not engage in activities that affect the security of this Website or any information stored within it.</p>
            <p>5.3. You agree not to:</p>
            <p>5.3.1. Use automated tools to access or extract data.</p>
            <p>5.3.2. Duplicate or distribute website content without permission.</p>
            <p>5.3.3. Use methods to obtain, process, or repackage website content.</p>
            <p>5.3.4. Reverse engineer or deconstruct the Website's source code.</p>
            <p>5.3.5. Use tools to obtain large amounts of data.</p>
            <p>5.3.6. Attempt to uncover valuation or business methodologies.</p>
            <p>5.3.7. Post or send spam as defined in the Commonwealth Spam Act (2003).</p>
            <p>5.4. Unlawful or fraudulent use of this Website is prohibited.</p>
            <p>5.5. Any information provided by you on this Website must be true, accurate, and complete.</p>
          </TermsSection>

          {/* 6. Registering an Account */}
          <TermsSection title="6. Registering an Account">
            <p>6.1. You may create a personal account to access member services. Accounts are created using a username and password or social media authentication.</p>
            <p>6.2. If you create an account, you agree that:</p>
            <p>6.2.1. Your Login Details are for your use only.</p>
            <p>6.2.2. You will keep your Login Details secure and confidential.</p>
            <p>6.2.3. You are responsible for actions taken with your Login Details.</p>
            <p>6.2.4. Breaches of these Terms under your Login Details will be treated as breaches by you.</p>
            <p>6.3. If your Login Details are compromised, notify us immediately and change your password. We are not liable for losses due to unauthorised use of your Login Details.</p>
            <p>6.4. We may deactivate your account for unauthorised use and will notify you via provided contact methods.</p>
          </TermsSection>

          {/* 7. No Advice */}
          <TermsSection title="7. No Advice">
            <p>7.1. Loan Fair Pty Ltd does not offer financial, investment, or other monetary advice. Nothing on this Website constitutes such advice.</p>
            <p>7.2. This Website is for comparison and research purposes only. We do not bind third party providers or ensure they will sell products to you. Products are subject to third party approval.</p>
          </TermsSection>

          {/* 8. Intellectual Property Rights */}
          <TermsSection title="8. Intellectual Property Rights">
            <p>8.1. "Loan Fair Pty Ltd" trademarks and associated logos are owned by Loan Fair Pty Ltd or its subsidiaries.</p>
            <p>8.2. All intellectual property rights in content on this Website are owned or licensed by Loan Fair Pty Ltd.</p>
            <p>8.3. Use of trademarks is restricted:</p>
            <p>8.3.1. Do not use them as part of your own trademarks.</p>
            <p>8.3.2. Do not use them in a way that causes confusion or defamation.</p>
            <p>8.3.3. Do not imply endorsement of products or services not related to Loan Fair Pty Ltd.</p>
            <p>8.4. Intellectual property rights cannot be used without our written consent.</p>
          </TermsSection>

          {/* 9. Exclusions of Liability */}
          <TermsSection title="9. Exclusions of Liability">
            <p>9.1. This Website, content, and services are provided "as is." We make no warranties regarding their value, purpose, reliability, accuracy, completeness, security, or error-free status.</p>
            <p>9.2. Use of this Website and actions taken based on its information are at your own risk. Loan Fair Pty Ltd is not liable for any losses incurred.</p>
            <p>9.3. We do not guarantee the Website is free from harmful elements like viruses.</p>
            <p>9.4. We aim for continuous uptime but do not guarantee it. We may suspend, restrict, or terminate access at any time.</p>
            <p>9.5. We are not liable for:</p>
            <p>9.5.1. Losses from using or relying on this Website.</p>
            <p>9.5.2. Removal of your data or information.</p>
            <p>9.5.3. Losses from service interruptions or website failures.</p>
            <p>9.5.4. Removal of your content or communications.</p>
            <p>9.5.5. Circumstances beyond our control.</p>
            <p>9.5.6. Losses or damages not directly caused by us or reasonably expected.</p>
          </TermsSection>

          {/* 10. Indemnity */}
          <TermsSection title="10. Indemnity">
            <p>10.1. You agree to indemnify us, our directors, employees, agents, and contractors for any loss or expenses from a breach of these Terms of Use or your use of this Website.</p>
          </TermsSection>

          {/* 11. Contact Us */}
          <TermsSection title="11. Contact Us">
            <p>11.1. We provide links to third-party websites for additional information. We do not control or endorse these websites. We are not liable for any loss incurred from accessing third-party sites.</p>
            <p>11.2. For questions about this Website or our services, please contact us.</p>
          </TermsSection>

          {/* 12. General */}
          <TermsSection title="12. General">
            <p>12.1. If any part of these Terms is invalid or unenforceable, it will be replaced by a valid provision reflecting the spirit of the original. The rest of the Terms will continue in effect.</p>
            <p>12.2. Failure to enforce rights under these Terms does not prevent further action.</p>
            <p>12.3. These Terms constitute the entire agreement between you and us regarding your use of this Website, superseding any prior agreements.</p>
          </TermsSection>

          {/* 13. Governing Law */}
          <TermsSection title="13. Governing Law">
            <p>13.1. These Terms and your use of this Website are governed by the laws of Victoria and the Commonwealth of Australia.</p>
            <p>13.2. You and we submit to the non-exclusive jurisdiction of the courts of Victoria and the Commonwealth of Australia in relation to these Terms and your use of this Website.</p>
            <p>By using this Website, you agree to these Terms and Conditions.</p>
          </TermsSection>

        </div>
      </section>
    </>
  )
}

// Renders a single titled section with a scroll-reveal animation
function TermsSection({ title, children }) {
  const ref = useScrollReveal()
  return (
    <div className="privacy-section reveal" ref={ref}>
      {title && <h2 className="privacy-section__title">{title}</h2>}
      <div className="privacy-section__body">{children}</div>
    </div>
  )
}
