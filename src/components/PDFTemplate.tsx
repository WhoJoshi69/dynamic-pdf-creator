import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
  Svg,
  Path,
} from "@react-pdf/renderer";

// Register Outfit font for react-pdf
Font.register({
  family: "Outfit",
  fonts: [
    {
      src: "/Outfit-VariableFont_wght.ttf",
      fontWeight: 400,
    },
    {
      src: "/Outfit-VariableFont_wght.ttf",
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  // Dark variant 1 for content slides (deep navy)
  page: {
    backgroundColor: "#020024",
    fontFamily: "Outfit",
    padding: 0,
    position: "relative",
  },
  // Dark variant 2 for alternating content slides (deep purple-black)
  pageAlt: {
    backgroundColor: "#0d0620",
    fontFamily: "Outfit",
    padding: 0,
    position: "relative",
  },
  // Cover page - lighter purple tone for contrast with logo
  coverPage: {
    backgroundColor: "#1a0a3e",
    fontFamily: "Outfit",
    padding: 0,
    position: "relative",
  },
  coverHeader: {
    position: "absolute",
    top: 40,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  companyLogo: {
    maxWidth: 200,
    maxHeight: 80,
    objectFit: "contain",
  },
  pageNumberBadge: {
    backgroundColor: "#7C3AED",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  pageNumberText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: 700,
    fontFamily: "Outfit",
  },
  coverCenterContent: {
    position: "absolute",
    top: "28%",
    left: 0,
    right: 0,
    alignItems: "center",
    transform: "translateY(-50%)",
  },
  centerImage: {
    maxWidth: 500,
    maxHeight: 200,
    objectFit: "contain",
    marginBottom: 30,
  },
  coverTitle: {
    fontSize: 30,
    fontWeight: 700,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 1.2,
    // textTransform: "uppercase",
    fontFamily: "Outfit",
    marginBottom: 20,
    paddingHorizontal: 40,
    letterSpacing: 1,
  },
  coverSubtitle: {
    fontSize: 10,
    fontWeight: 700,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 1.4,
    textTransform: "uppercase",
    fontFamily: "Outfit",
    paddingHorizontal: 40,
    letterSpacing: 3,
  },
  coverFooter: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  websiteText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "Outfit",
    fontWeight: 400,
  },
  arrowContainer: {
    width: 32,
    height: 24,
  },
  // Content slide styles
  slideHeader: {
    position: "absolute",
    top: 40,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brandingText: {
    fontSize: 18,
    fontWeight: 700,
    color: "#FFFFFF",
    fontFamily: "Outfit",
  },
  slideCompanyLogo: {
    maxWidth: 200,
    maxHeight: 80,
    objectFit: "contain",
  },
  contentContainer: {
    marginTop: 140,
    paddingHorizontal: 60,
    paddingRight: 80,
    alignItems: "flex-start",
  },
  heading: {
    fontSize: 36,
    fontWeight: 800,
    color: "#FFFFFF",
    marginBottom: 40,
    lineHeight: 1.1,
    fontFamily: "Outfit",
    textAlign: "left",
    letterSpacing: 0,
  },
  description: {
    fontSize: 20,
    fontWeight: 700,
    color: "#E5E7EB",
    lineHeight: 1.5,
    fontFamily: "Outfit",
    textAlign: "justify",
    maxWidth: 480,
  },
  slideFooter: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // CTA page styles - lighter purple tone (same as cover for consistency)
  ctaPage: {
    backgroundColor: "#1a0a3e",
    fontFamily: "Outfit",
    padding: 0,
    position: "relative",
  },
  ctaContent: {
    marginTop: 140,
    paddingHorizontal: 60,
    paddingRight: 80,
    alignItems: "flex-start",
  },
  ctaHeading: {
    fontSize: 48,
    fontWeight: 700,
    color: "#FFFFFF",
    marginBottom: 40,
    lineHeight: 1.1,
    fontFamily: "Outfit",
    textAlign: "left",
    letterSpacing: 0,
  },
  ctaText: {
    fontSize: 20,
    fontWeight: 700,
    color: "#E5E7EB",
    marginBottom: 16,
    lineHeight: 1.5,
    fontFamily: "Outfit",
    textAlign: "justify",
    maxWidth: 480,
  },
});

// Arrow Icon Component
const ArrowIcon = () => (
  <View style={styles.arrowContainer}>
    <Svg width="36" height="24" viewBox="0 0 36 24">
      <Path
        d="M2 12h30M28 5l7 7-7 7"
        stroke="#7C3AED"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  </View>
);

export interface SlideData {
  pageNumber: string;
  heading: string;
  description: string;
}

export interface PDFData {
  coverTitle: string;
  coverSubtitle: string;
  branding: string;
  websiteUrl: string;
  slides: SlideData[];
  ctaHeading: string;
  ctaText1: string;
  ctaText2: string;
  ctaText3: string;
  centerImage?: string; // Optional center image for cover page
  companyLogo?: string; // Optional company logo
}

interface PDFTemplateProps {
  data: PDFData;
}

export const PDFTemplate = ({ data }: PDFTemplateProps) => (
  <Document>
    {/* Cover Page */}
    <Page size="A4" style={styles.coverPage}>
      {/* Header with logo and page number */}
      <View style={styles.coverHeader}>
        {data.companyLogo ? (
          <Image src={data.companyLogo} style={styles.companyLogo} />
        ) : (
          <Text style={styles.brandingText}>{data.branding}</Text>
        )}
        <View style={styles.pageNumberBadge}>
          <Text style={styles.pageNumberText}>01</Text>
        </View>
      </View>

      {/* Center content */}
      <View style={styles.coverCenterContent}>
        {data.centerImage && (
          <Image src={data.centerImage} style={styles.centerImage} />
        )}
        <Text style={styles.coverTitle}>
          {data.coverTitle.split(" ").map((word, index) => {
            // Highlight specific words in purple (you can customize this logic)
            const purpleWords = ["HOW", "99.99%"];
            return purpleWords.includes(word) ? (
              <Text key={index}>
                {word}{" "}
              </Text>
            ) : (
              <Text key={index}>{word} </Text>
            );
          })}
        </Text>
        <Text style={styles.coverSubtitle}>{data.coverSubtitle}</Text>
      </View>

      {/* Footer */}
      <View style={styles.coverFooter}>
        <Text style={styles.websiteText}>{data.websiteUrl}</Text>
        <ArrowIcon />
      </View>
    </Page>

    {/* Content Slides - alternating between two dark variants */}
    {data.slides.map((slide, index) => (
      <Page key={index} size="A4" style={index % 2 === 0 ? styles.page : styles.pageAlt}>
        {/* Header with company logo on left */}
        <View style={styles.slideHeader}>
          {data.companyLogo ? (
            <Image src={data.companyLogo} style={styles.slideCompanyLogo} />
          ) : (
            <Text style={styles.brandingText}>{data.branding}</Text>
          )}
          <View style={styles.pageNumberBadge}>
            <Text style={styles.pageNumberText}>{slide.pageNumber}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>{slide.heading}</Text>
          <Text style={styles.description}>{slide.description}</Text>
        </View>

        {/* Footer */}
        <View style={styles.slideFooter}>
          <Text style={styles.websiteText}>{data.websiteUrl}</Text>
          <ArrowIcon />
        </View>
      </Page>
    ))}

    {/* CTA/Final Page */}
    <Page size="A4" style={styles.ctaPage}>
      {/* Header */}
      <View style={styles.slideHeader}>
        {data.companyLogo ? (
          <Image src={data.companyLogo} style={styles.slideCompanyLogo} />
        ) : (
          <Text style={styles.brandingText}>{data.branding}</Text>
        )}
      </View>

      {/* Content */}
      <View style={styles.ctaContent}>
        <Text style={styles.ctaHeading}>{data.ctaHeading}</Text>
        <Text style={styles.ctaText}>{data.ctaText1}</Text>
        <Text style={styles.ctaText}>{data.ctaText2}</Text>
        <Text style={styles.ctaText}>{data.ctaText3}</Text>
      </View>

      {/* Footer */}
      <View style={styles.slideFooter}>
        <Text style={styles.websiteText}>{data.websiteUrl}</Text>
        <ArrowIcon />
      </View>
    </Page>
  </Document>
);
