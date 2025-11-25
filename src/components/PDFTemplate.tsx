import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Use system fonts for reliability - Helvetica is similar to Montserrat and works well
// No custom font registration needed, using built-in fonts

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#020024',
    fontFamily: 'Helvetica',
    padding: 0,
    position: 'relative',
  },
  // Cover page styles matching the design
  coverPage: {
    backgroundColor: '#020024',
    fontFamily: 'Helvetica',
    padding: 0,
    position: 'relative',
  },
  coverHeader: {
    position: 'absolute',
    top: 40,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  companyLogo: {
    maxWidth: 200,
    maxHeight: 80,
    objectFit: 'contain',
  },
  pageNumberBadge: {
    backgroundColor: '#7C3AED',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  pageNumberText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 700,
    fontFamily: 'Helvetica-Bold',
  },
  coverCenterContent: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    transform: 'translateY(-50%)',
  },
  centerImage: {
    maxWidth: 400,
    maxHeight: 150,
    objectFit: 'contain',
    marginBottom: 40,
  },
  coverTitle: {
    fontSize: 42,
    fontWeight: 800,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 1.2,
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
    paddingHorizontal: 40,
  },
  coverTitlePurple: {
    color: '#7C3AED',
  },
  coverSubtitle: {
    fontSize: 42,
    fontWeight: 800,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 1.2,
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
    paddingHorizontal: 40,
  },
  coverFooter: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  websiteText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Helvetica',
    fontWeight: 400,
  },
  arrowIcon: {
    width: 40,
    height: 20,
    backgroundColor: '#7C3AED',
  },
  // Content slide styles
  slideHeader: {
    position: 'absolute',
    top: 40,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandingText: {
    fontSize: 18,
    fontWeight: 700,
    color: '#FFFFFF',
    fontFamily: 'Helvetica-Bold',
  },
  slideCompanyLogo: {
    maxWidth: 200,
    maxHeight: 80,
    objectFit: 'contain',
  },
  contentContainer: {
    marginTop: 200,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  heading: {
    fontSize: 36,
    fontWeight: 800,
    color: '#FFFFFF',
    marginBottom: 24,
    lineHeight: 1.2,
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    fontWeight: 400,
    color: '#E5E7EB',
    lineHeight: 1.6,
    fontFamily: 'Helvetica',
    textAlign: 'center',
    maxWidth: 500,
  },
  slideFooter: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // CTA page styles
  ctaPage: {
    backgroundColor: '#020024',
    fontFamily: 'Helvetica',
    padding: 0,
    position: 'relative',
  },
  ctaContent: {
    marginTop: 200,
    paddingHorizontal: 60,
  },
  ctaHeading: {
    fontSize: 42,
    fontWeight: 800,
    color: '#FFFFFF',
    marginBottom: 40,
    lineHeight: 1.2,
    textTransform: 'uppercase',
    fontFamily: 'Helvetica-Bold',
  },
  ctaText: {
    fontSize: 18,
    fontWeight: 400,
    color: '#E5E7EB',
    marginBottom: 12,
    lineHeight: 1.6,
    fontFamily: 'Helvetica',
  },
});

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
          {data.coverTitle.split(' ').map((word, index) => {
            // Highlight specific words in purple (you can customize this logic)
            const purpleWords = ['HOW', '99.99%'];
            return purpleWords.includes(word) ? (
              <Text key={index} style={styles.coverTitlePurple}>{word} </Text>
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
        <View style={styles.arrowIcon} />
      </View>
    </Page>

    {/* Content Slides */}
    {data.slides.map((slide, index) => (
      <Page key={index} size="A4" style={styles.page}>
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
          <View style={styles.arrowIcon} />
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
        <View style={styles.arrowIcon} />
      </View>
    </Page>
  </Document>
);
