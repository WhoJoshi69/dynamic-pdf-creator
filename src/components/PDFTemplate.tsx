import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts for better typography
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2', fontWeight: 700 },
  ]
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Inter',
  },
  header: {
    marginBottom: 30,
    borderBottom: '2px solid #3B82F6',
    paddingBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1E40AF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: 400,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#1F2937',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  content: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 1.6,
    fontWeight: 400,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: 600,
    color: '#6B7280',
    width: 120,
  },
  value: {
    fontSize: 11,
    color: '#1F2937',
    flex: 1,
    fontWeight: 400,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#9CA3AF',
    borderTop: '1px solid #E5E7EB',
    paddingTop: 10,
  },
});

export interface PDFData {
  title: string;
  subtitle: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  reference: string;
  description: string;
  additionalNotes: string;
}

interface PDFTemplateProps {
  data: PDFData;
}

export const PDFTemplate = ({ data }: PDFTemplateProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.subtitle}>{data.subtitle}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{data.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{data.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{data.phone}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Document Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{data.date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Reference:</Text>
          <Text style={styles.value}>{data.reference}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.content}>{data.description}</Text>
      </View>

      {data.additionalNotes && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Notes</Text>
          <Text style={styles.content}>{data.additionalNotes}</Text>
        </View>
      )}

      <Text style={styles.footer}>
        Generated on {new Date().toLocaleDateString()} • This is an automatically generated document
      </Text>
    </Page>
  </Document>
);
