import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFTemplate, PDFData } from './PDFTemplate';
import { FileDown, FileText } from 'lucide-react';
import { toast } from 'sonner';

export const PDFForm = () => {
  const [formData, setFormData] = useState<PDFData>({
    title: 'Professional Document',
    subtitle: 'Official Document Template',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    date: new Date().toLocaleDateString(),
    reference: 'DOC-2024-001',
    description: 'This is a sample document generated using the PDF maker. You can customize all fields to create your own professional documents with consistent formatting and design.',
    additionalNotes: 'Additional information or notes can be added here for further details.',
  });

  const handleChange = (field: keyof PDFData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGeneratePDF = () => {
    toast.success('PDF is ready to download!');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-2 text-foreground">PDF Maker</h1>
        <p className="text-muted-foreground text-lg">Create professional documents with ease</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Document Information</CardTitle>
            <CardDescription>Fill in the details for your PDF document</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Document Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter document title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                placeholder="Enter subtitle"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Enter your phone"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Document Content</CardTitle>
            <CardDescription>Add the main content and details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                placeholder="Document date"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference">Reference Number</Label>
              <Input
                id="reference"
                value={formData.reference}
                onChange={(e) => handleChange('reference', e.target.value)}
                placeholder="Enter reference number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Enter main description"
                rows={5}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.additionalNotes}
                onChange={(e) => handleChange('additionalNotes', e.target.value)}
                placeholder="Any additional notes (optional)"
                rows={3}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-center">
        <PDFDownloadLink
          document={<PDFTemplate data={formData} />}
          fileName={`${formData.reference || 'document'}.pdf`}
          onClick={handleGeneratePDF}
        >
          {({ loading }) => (
            <Button size="lg" disabled={loading} className="gap-2 px-8">
              <FileDown className="w-5 h-5" />
              {loading ? 'Preparing PDF...' : 'Generate & Download PDF'}
            </Button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
};
