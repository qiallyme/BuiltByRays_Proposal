export const BRAND = {
    companyName: "BuiltByRays™",
    proposalTitle: "Executive Growth Partnership Proposal",
    logo: "/logo.png",              // TODO: Replace with actual logo file
    poweredBy: "QiSuite™",
    companyEntity: "QiAlly LLC",
    companyWebsite: "www.qially.me"
  };
  
  export const LINKS = {
    feedbackFormEmbed: "https://forms.zohopublic.com/QiAlly/form/ProductFeedback/formperma/bElAvlqlmtPU33RZ9ECQ9jRgdYPwFHSsVaIecAsvhAo?first=Blanca&last=Ramon%20Valverde&email=b.roman42%40yahoo.com&company=Rays%20Construction%20LLC&role=Owner", // TODO: Replace with actual Zoho Form embed URL
    paymentSite: "https://qiallyme.github.io/support-cody/index.html",
    signUrl:"https://sign.zoho.com/zsfl/AcuaPfybIxwMTQYZFj54?i=6411&recipient_name=Blanca+Ramon+Valverde&recipient_email=b.roman42%40yahoo.com" // TODO: Update with actual client info
  };
  
  export const MEDIA = {
    introVideo: "/intro.mp4" // TODO: Replace with actual video file
  };
  
  // default economic settings
  export const DEFAULTS = {
    baseRetainerWeekly: 250,
    inflationMode: "CPI+2" as "CPI+2" | "Flat5",
    cpiRate: 0.03,
    bufferWeekly: 250,
    bufferTargetMonthly: 1000,
    baselineAnnualGross: 400000,
    projectedAnnualGross: 500000,
    growthBonusRate: 0.05,
    directSavingsFirstYear: 25000,
    directSavingsRate: 0.2,
    taxAuditSavings: 14000,
    intangibleAssignedValue: 30000,
    intangibleRate: 0.10,
    intangiblePayoutYears: 1,
    totalWeeks: 78,
    firstMonthAccommodation: true
  };
  