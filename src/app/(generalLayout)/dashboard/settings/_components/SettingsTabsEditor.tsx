"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Save, Check, Loader2 } from "lucide-react";
import JoditTextEditor from "@/components/form/ATextEditor";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import {
  useGetContentsQuery,
  useUpdateContentMutation,
} from "@/redux/api/contentApi";
import handleMutation from "@/utils/handleMutation";

interface ContentSection {
  id: string;
  title: string;
  content: string;
}

const SettingsTabsEditor = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [savingStates, setSavingStates] = useState<Record<string, boolean>>({});
  const [savedStates, setSavedStates] = useState<Record<string, boolean>>({});
  const [contentSections, setContentSections] = useState<ContentSection[]>([
    { id: "about", title: "About Us", content: "" },
    { id: "terms", title: "Terms & Conditions", content: "" },
    { id: "privacy", title: "Privacy Policy", content: "" },
    { id: "supports", title: "Supports", content: "" },
    { id: "faq", title: "FAQ", content: "" },
  ]);

  const {
    data: contentsResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetContentsQuery({ page: 1, limit: 1 });
  const [updateContent] = useUpdateContentMutation();
  const content = contentsResponse?.data[0];

  // Initialize content sections from API
  if (content && contentSections.every((section) => !section.content)) {
    setContentSections([
      { id: "about", title: "About Us", content: content.aboutUs },
      {
        id: "terms",
        title: "Terms & Conditions",
        content: content.termsAndConditions,
      },
      {
        id: "privacy",
        title: "Privacy Policy",
        content: content.privacyPolicy,
      },
      { id: "supports", title: "Supports", content: content.supports },
      { id: "faq", title: "FAQ", content: content.faq },
    ]);
  }

  const handleContentChange = (sectionId: string, content: string) => {
    setContentSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, content } : section
      )
    );
    setSavedStates((prev) => ({ ...prev, [sectionId]: false }));
  };

  const handleSave = (sectionId: string) => {
    if (!content) return;

    setSavingStates((prev) => ({ ...prev, [sectionId]: true }));

    const section = contentSections.find((s) => s.id === sectionId);
    const payload = {
      id: content._id,
      aboutUs: sectionId === "about" ? section?.content || "" : content.aboutUs,
      termsAndConditions:
        sectionId === "terms"
          ? section?.content || ""
          : content.termsAndConditions,
      privacyPolicy:
        sectionId === "privacy"
          ? section?.content || ""
          : content.privacyPolicy,
      supports:
        sectionId === "supports" ? section?.content || "" : content.supports,
      faq: sectionId === "faq" ? section?.content || "" : content.faq,
    };

    handleMutation(
      payload,
      updateContent,
      `Saving ${section?.title}...`,
      () => {
        setSavedStates((prev) => ({ ...prev, [sectionId]: true }));
        setTimeout(() => {
          setSavedStates((prev) => ({ ...prev, [sectionId]: false }));
        }, 2000);
        setSavingStates((prev) => ({ ...prev, [sectionId]: false }));
      }
    );
  };

  if (isLoading) return <ASpinner size={150} className="py-64" />;
  if (isError)
    return <AErrorMessage error={error} onRetry={refetch} className="py-64" />;
  if (!content)
    return (
      <div className="py-64 text-center text-muted-foreground">
        No content found
      </div>
    );

  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="flex-1">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col"
        >
          {/* Tabs Header */}
          <TabsList className="grid w-full grid-cols-5 bg-card mb-6 h-14">
            <TabsTrigger
              value="about"
              className="data-[state=active]:bg-primary data-[state=active]:text-card"
            >
              About Us
            </TabsTrigger>
            <TabsTrigger
              value="terms"
              className="data-[state=active]:bg-primary data-[state=active]:text-card"
            >
              Terms & Conditions
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="data-[state=active]:bg-primary data-[state=active]:text-card"
            >
              Privacy Policy
            </TabsTrigger>
            <TabsTrigger
              value="supports"
              className="data-[state=active]:bg-primary data-[state=active]:text-card"
            >
              Supports
            </TabsTrigger>
            <TabsTrigger
              value="faq"
              className="data-[state=active]:bg-primary data-[state=active]:text-card"
            >
              FAQ
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <div className="flex-1 flex flex-col">
            {contentSections.map((section) => (
              <TabsContent
                key={section.id}
                value={section.id}
                className="flex-1 flex flex-col mt-0"
              >
                <div className="flex-1 flex flex-col">
                  {/* Title */}
                  <div className="p-6 border-b border-border">
                    <h1 className="text-2xl font-bold text-foreground">
                      {section.title}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Edit and manage your {section.title.toLowerCase()} content
                    </p>
                  </div>

                  {/* Editor */}
                  <div className="flex-1 p-6">
                    <div className="h-fit bg-background border border-border rounded-lg overflow-hidden">
                      <JoditTextEditor
                        content={section.content}
                        onChange={(content) =>
                          handleContentChange(section.id, content)
                        }
                        placeholder={`Enter your ${section.title.toLowerCase()} content here...`}
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="p-6 border-t border-border">
                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleSave(section.id)}
                        disabled={
                          savingStates[section.id] || savedStates[section.id]
                        }
                        className="min-w-[140px] gap-2"
                        size="lg"
                      >
                        {savingStates[section.id] ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : savedStates[section.id] ? (
                          <>
                            <Check className="h-4 w-4" />
                            Saved
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsTabsEditor;
