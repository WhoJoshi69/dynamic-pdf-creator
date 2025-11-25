import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFTemplate, PDFData, SlideData } from "./PDFTemplate";
import {
  FileDown,
  FileText,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";

export const PDFForm = () => {
  const [formData, setFormData] = useState<PDFData>({
    coverTitle: "HOW WE ENSURE 99.99% UPTIME",
    coverSubtitle: "DEVOPS AND MONITORING IN ACTION",
    branding: "bytespark",
    websiteUrl: "thebytespark.com",
    companyLogo: "/company-logo.png", // Default to the existing company logo
    slides: [
      {
        pageNumber: "02",
        heading: "The Promise",
        description:
          "Every second of downtime costs trust and growth.\n\nThat's why at Advant AI Labs, uptime isn't a metric.\n\nIt's a commitment.",
      },
      {
        pageNumber: "03",
        heading: "The Backbone: DevOps",
        description:
          "Our DevOps culture bridges silos between dev and ops, so features ship faster AND stay stable.\n\nContinuous integration + rapid deployment = fewer errors, faster fixes.",
      },
      {
        pageNumber: "04",
        heading: "Continuous Monitoring",
        description:
          "Every app, API, and microservice is monitored in real-time.\n\nReal-time alerts + anomaly detection catch 99% of issues before users ever notice.",
      },
    ],
    ctaHeading: "WANT YOUR AI SYSTEMS THIS RELIABLE?",
    ctaText1: "Let's engineer your uptime strategy.",
    ctaText2: "DM us to talk DevOps.",
    ctaText3: "Follow us for more tech insights.",
  });

  const handleChange = (field: keyof PDFData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSlideChange = (
    index: number,
    field: keyof SlideData,
    value: string
  ) => {
    const updatedSlides = [...formData.slides];
    updatedSlides[index] = { ...updatedSlides[index], [field]: value };
    setFormData((prev) => ({ ...prev, slides: updatedSlides }));
  };

  const addSlide = () => {
    const newSlideNumber = String(formData.slides.length + 2).padStart(2, "0");
    setFormData((prev) => ({
      ...prev,
      slides: [
        ...prev.slides,
        {
          pageNumber: newSlideNumber,
          heading: "New Slide",
          description: "Add your content here.",
        },
      ],
    }));
    toast.success("New slide added!");
  };

  const removeSlide = (index: number) => {
    if (formData.slides.length === 1) {
      toast.error("You need at least one slide!");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      slides: prev.slides.filter((_, i) => i !== index),
    }));
    toast.success("Slide removed!");
  };

  const handleImageUpload = (
    field: "centerImage" | "companyLogo",
    file: File
  ) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setFormData((prev) => ({ ...prev, [field]: result }));
      toast.success(
        `${field === "centerImage" ? "Center image" : "Company logo"} uploaded!`
      );
    };
    reader.readAsDataURL(file);
  };

  const handleGeneratePDF = () => {
    toast.success("PDF is ready to download!");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-foreground">
            WhoJoshi content maker
          </h1>
          <p className="text-muted-foreground text-lg">
            Create beautiful presentation-style PDFs
          </p>
        </div>

        <div className="space-y-6">
          {/* Cover Page Settings */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Cover Page</CardTitle>
              <CardDescription>
                Main title and subtitle for your presentation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="coverTitle">Cover Title</Label>
                <Input
                  id="coverTitle"
                  value={formData.coverTitle}
                  onChange={(e) => handleChange("coverTitle", e.target.value)}
                  placeholder="Main title"
                  className="font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverSubtitle">Cover Subtitle</Label>
                <Input
                  id="coverSubtitle"
                  value={formData.coverSubtitle}
                  onChange={(e) =>
                    handleChange("coverSubtitle", e.target.value)
                  }
                  placeholder="Subtitle"
                />
              </div>
            </CardContent>
          </Card>

          {/* Branding */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Branding</CardTitle>
              <CardDescription>Company name and website URL</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="branding">Company/Brand Name</Label>
                <Input
                  id="branding"
                  value={formData.branding}
                  onChange={(e) => handleChange("branding", e.target.value)}
                  placeholder="bytespark"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="websiteUrl">Website URL</Label>
                <Input
                  id="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={(e) => handleChange("websiteUrl", e.target.value)}
                  placeholder="example.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Images</CardTitle>
              <CardDescription>
                Upload company logo and center image for your presentation
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Company Logo</Label>
                  <p className="text-sm text-muted-foreground">
                    Will appear on top-left of cover page and top-right of
                    slides
                  </p>
                </div>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  {formData.companyLogo ? (
                    <div className="space-y-2">
                      <img
                        src={formData.companyLogo}
                        alt="Company Logo"
                        className="max-h-16 mx-auto"
                      />
                      <p className="text-sm text-muted-foreground">
                        Logo uploaded
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            companyLogo: undefined,
                          }))
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Upload company logo
                      </p>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload("companyLogo", file);
                        }}
                        className="max-w-xs mx-auto"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Center Image (Cover Page)</Label>
                  <p className="text-sm text-muted-foreground">
                    Optional illustration for the center of your cover page
                  </p>
                </div>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  {formData.centerImage ? (
                    <div className="space-y-2">
                      <img
                        src={formData.centerImage}
                        alt="Center Image"
                        className="max-h-24 mx-auto"
                      />
                      <p className="text-sm text-muted-foreground">
                        Center image uploaded
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            centerImage: undefined,
                          }))
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Upload center image
                      </p>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload("centerImage", file);
                        }}
                        className="max-w-xs mx-auto"
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Slides */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Content Slides</h2>
              <Button onClick={addSlide} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Slide
              </Button>
            </div>

            {formData.slides.map((slide, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>Slide {index + 1}</CardTitle>
                      <CardDescription>
                        Page number: {slide.pageNumber}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSlide(index)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`pageNum-${index}`}>Page #</Label>
                      <Input
                        id={`pageNum-${index}`}
                        value={slide.pageNumber}
                        onChange={(e) =>
                          handleSlideChange(index, "pageNumber", e.target.value)
                        }
                        placeholder="02"
                        maxLength={2}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-3">
                      <Label htmlFor={`heading-${index}`}>Heading</Label>
                      <Input
                        id={`heading-${index}`}
                        value={slide.heading}
                        onChange={(e) =>
                          handleSlideChange(index, "heading", e.target.value)
                        }
                        placeholder="Slide heading"
                        className="font-bold"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Textarea
                      id={`description-${index}`}
                      value={slide.description}
                      onChange={(e) =>
                        handleSlideChange(index, "description", e.target.value)
                      }
                      placeholder="Slide content..."
                      rows={5}
                      className="resize-none"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA/Final Page */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Call-to-Action Page</CardTitle>
              <CardDescription>
                Final page with your call to action
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ctaHeading">CTA Heading</Label>
                <Input
                  id="ctaHeading"
                  value={formData.ctaHeading}
                  onChange={(e) => handleChange("ctaHeading", e.target.value)}
                  placeholder="Want to learn more?"
                  className="font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaText1">CTA Text Line 1</Label>
                <Input
                  id="ctaText1"
                  value={formData.ctaText1}
                  onChange={(e) => handleChange("ctaText1", e.target.value)}
                  placeholder="First line of text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaText2">CTA Text Line 2</Label>
                <Input
                  id="ctaText2"
                  value={formData.ctaText2}
                  onChange={(e) => handleChange("ctaText2", e.target.value)}
                  placeholder="Second line of text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaText3">CTA Text Line 3</Label>
                <Input
                  id="ctaText3"
                  value={formData.ctaText3}
                  onChange={(e) => handleChange("ctaText3", e.target.value)}
                  placeholder="Third line of text"
                />
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <div className="flex justify-center pt-4">
            <PDFDownloadLink
              document={<PDFTemplate data={formData} />}
              fileName={`${formData.branding}-presentation.pdf`}
              onClick={handleGeneratePDF}
            >
              {({ loading }) => (
                <Button size="lg" disabled={loading} className="gap-2 px-8">
                  <FileDown className="w-5 h-5" />
                  {loading ? "Preparing PDF..." : "Generate & Download PDF"}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
};
