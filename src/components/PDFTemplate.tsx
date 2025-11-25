import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2', fontWeight: 700 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2', fontWeight: 800 },
  ]
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Inter',
    padding: 0,
    position: 'relative',
  },
  brandingTop: {
    position: 'absolute',
    top: 40,
    left: 40,
    fontSize: 18,
    fontWeight: 700,
    color: '#000000',
  },
  pageNumberContainer: {
    position: 'absolute',
    top: 80,
    left: 40,
    width: 100,
  },
  pageNumber: {
    fontSize: 120,
    fontWeight: 800,
    color: '#E5E7EB',
    lineHeight: 1,
  },
  contentContainer: {
    marginTop: 250,
    marginLeft: 180,
    marginRight: 60,
    maxWidth: 380,
  },
  heading: {
    fontSize: 36,
    fontWeight: 800,
    color: '#000000',
    marginBottom: 24,
    lineHeight: 1.2,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 16,
    fontWeight: 400,
    color: '#374151',
    lineHeight: 1.6,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    right: 60,
    fontSize: 12,
    color: '#6B7280',
    fontWeight: 400,
  },
  coverPage: {
    backgroundColor: '#FFFFFF',
    padding: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverTitle: {
    fontSize: 48,
    fontWeight: 800,
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 1.2,
    textTransform: 'uppercase',
  },
  coverSubtitle: {
    fontSize: 24,
    fontWeight: 600,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 1.4,
    textTransform: 'uppercase',
  },
  coverFooter: {
    position: 'absolute',
    bottom: 60,
    fontSize: 14,
    color: '#6B7280',
  },
  ctaPage: {
    backgroundColor: '#FFFFFF',
    padding: 60,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  ctaHeading: {
    fontSize: 42,
    fontWeight: 800,
    color: '#000000',
    marginBottom: 40,
    lineHeight: 1.2,
    textTransform: 'uppercase',
  },
  ctaText: {
    fontSize: 18,
    fontWeight: 400,
    color: '#374151',
    marginBottom: 12,
    lineHeight: 1.6,
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
}

interface PDFTemplateProps {
  data: PDFData;
}

export const PDFTemplate = ({ data }: PDFTemplateProps) => (
  <Document>
    {/* Cover Page */}
    <Page size="A4" style={styles.coverPage}>
      <Text style={styles.coverTitle}>{data.coverTitle}</Text>
      <Text style={styles.coverSubtitle}>{data.coverSubtitle}</Text>
      <Text style={styles.coverFooter}>{data.websiteUrl}</Text>
    </Page>

    {/* Content Slides */}
    {data.slides.map((slide, index) => (
      <Page key={index} size="A4" style={styles.page}>
        <Text style={styles.brandingTop}>{data.branding}</Text>
        <View style={styles.pageNumberContainer}>
          <Text style={styles.pageNumber}>{slide.pageNumber}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>{slide.heading}</Text>
          <Text style={styles.description}>{slide.description}</Text>
        </View>
        <Text style={styles.footer}>{data.websiteUrl}</Text>
      </Page>
    ))}

    {/* CTA/Final Page */}
    <Page size="A4" style={styles.ctaPage}>
      <Text style={styles.brandingTop}>{data.branding}</Text>
      <Text style={styles.ctaHeading}>{data.ctaHeading}</Text>
      <Text style={styles.ctaText}>{data.ctaText1}</Text>
      <Text style={styles.ctaText}>{data.ctaText2}</Text>
      <Text style={styles.ctaText}>{data.ctaText3}</Text>
      <Text style={styles.footer}>{data.websiteUrl}</Text>
    </Page>
  </Document>
);
