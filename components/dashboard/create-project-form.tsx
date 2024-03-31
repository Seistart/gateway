"use client"

import { useState } from "react"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  NewProjectWithTagsParams,
  Project,
} from "@/database/schemas/projects.schema"
import { Stage } from "@/database/schemas/stages.schema"
import { Tag } from "@/database/schemas/tags.schema"
import {
  createProjectWithTagsAction,
  updateProjectWithTagsAction,
} from "@/server-actions/projects/projects.actions"
import { cn } from "@/utils/tailwind.utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Switch } from "../ui/switch"
import { Textarea } from "../ui/textarea"

const steps = [
  {
    id: "Step 1",
    name: "Project Info",
    fields: ["name", "slug", "summary", "description"],
  },
  {
    id: "Step 2",
    name: "Project Details",
    fields: [
      "tokenName",
      "tokenSupply",
      "releaseDate",
      "isLive",
      "stage",
      "website",
      "whitepaper",
    ],
  },
  {
    id: "Step 3",
    name: "Social Media",
    fields: [
      "twitter",
      "discord",
      "telegram",
      "wechat",
      "contactName",
      "contactEmail",
    ],
  },
  { id: "Step 4", name: "Tags" },
]

interface CreateProjectFormProps {
  tags: Tag[]
  stages: Stage[]
  project?: Project
}

export const ProjectFormDataSchema = z.object({
  name: z.string().min(1, {
    message: "Required",
  }),
  slug: z.string().min(1, {
    message: "Required",
  }),
  summary: z.string().min(1, {
    message: "Required",
  }),
  description: z.string().min(1, {
    message: "Required",
  }),
  mainTagId: z.number(),
  tokenSupply: z.number().optional(),
  communitySize: z.number().optional(),
  tokenName: z.string().optional(),
  website: z.string().optional(),
  whitepaper: z.string().optional(),
  stageId: z.number(),
  releaseDate: z.date().optional().nullable(),
  isLive: z.boolean().optional(),
  twitter: z.string().optional(),
  discord: z.string().optional(),
  telegram: z.string().optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().optional(),
  tags: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})

export const mapProjectTagNamesToIds = (
  allTags: Tag[],
  projectTags?: string[]
) => {
  if (!projectTags || projectTags.length === 0) {
    return [] as number[] // Return an empty array if there are no project tags
  }

  const tagIds = projectTags
    .map((tagName) => {
      // Find the corresponding tag object in the 'allTags' array
      const tagObj = allTags.find((tag) => tag.name === tagName)
      // Return the 'id' of the tag object, or null if the tag wasn't found
      return tagObj ? tagObj.id : null
    })
    .filter((id) => id !== null) // Remove any null values from the array

  return tagIds as number[]
}

export default function CreateProjectForm({
  tags,
  stages,
  project,
}: CreateProjectFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [_, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const form = useForm<NewProjectWithTagsParams>({
    mode: "all",
    resolver: zodResolver(ProjectFormDataSchema),
    defaultValues: {
      name: project?.name || "",
      slug: project?.slug || "",
      tokenName: project?.tokenName || "",
      tokenSupply: project?.tokenSupply || undefined,
      releaseDate: project?.releaseDate || null,
      summary: project?.summary || "",
      isLive: project?.isLive || false,
      stageId: project?.stageId || stages[0].id,
      description: project?.description || "",
      communitySize: project?.communitySize || 0,
      website: project?.website || "",
      whitepaper: project?.whitepaper || "",
      mainTagId: project?.mainTagId,
      twitter: project?.twitter || "",
      discord: project?.discord || "",
      telegram: project?.telegram || "",
      contactName: project?.contactName || "",
      contactEmail: project?.contactEmail || "",
      tags: mapProjectTagNamesToIds(tags, project?.tags),
    },
  })

  const processForm: SubmitHandler<NewProjectWithTagsParams> = async (data) => {
    try {
      setIsSubmitting(true)
      let slug
      if (project) {
        slug = await updateProjectWithTagsAction(data, project.id)
      } else {
        slug = await createProjectWithTagsAction(data)
      }
      router.push(`/dashboard/edit-projects`)
    } catch {
      setIsSubmitting(false)
    }
  }

  type FieldName = keyof NewProjectWithTagsParams

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    })
    if (!output) return
    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep)
      setCurrentStep((step) => step + 1)
    }
    if (currentStep === steps.length - 1) {
      await form.handleSubmit(processForm)()
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep((step) => step - 1)
    }
  }

  return (
    <section className="relative inset-0 mx-auto mt-20 flex max-w-[1400px] flex-col justify-between">
      {/* steps */}
      <nav aria-label="Progress">
        <ol role="list" className="flex space-x-8 space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col  border-l-0 border-t-4 border-border py-2 pb-0 pl-0 pt-4 transition-colors">
                  <span className="text-sm font-medium transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-0 border-t-4  border-border py-2 pb-0 pl-0 pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium">{step.id}</span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col  border-l-0 border-t-4 border-border/10 py-2 pb-0 pl-0 pt-4 transition-colors">
                  <span className="text-sm font-medium text-primary/50 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium text-primary/50">
                    {step.name}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}

      <Form {...form}>
        <form className="mt-20" onSubmit={form.handleSubmit(processForm)}>
          {currentStep === 0 && (
            <>
              <h2 className="mb-6 text-base font-semibold leading-7">
                Project Information
              </h2>
              <div className="flex flex-row items-center justify-center space-x-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Project Name (required)</FormLabel>
                      <FormControl>
                        <Input placeholder="Project Name" {...field} />
                      </FormControl>
                      <div className="h-6">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Project Slug (required)</FormLabel>
                      <FormControl>
                        <Input placeholder="Project Slug" {...field} />
                      </FormControl>
                      <div className="h-6">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Project Summary (required)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Project Summary" {...field} />
                    </FormControl>
                    <FormDescription>
                      Brief summary about your project.
                    </FormDescription>
                    <div className="h-6">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Project Description (required)</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-[200px]"
                        placeholder="Project Description"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Detailed description about your project.
                    </FormDescription>
                    <div className="h-6">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </>
          )}

          {currentStep === 1 && (
            <>
              <h2 className="mb-6 text-base font-semibold leading-7  ">
                Project Details
              </h2>
              <div className="flex flex-row items-center justify-center space-x-4">
                <FormField
                  control={form.control}
                  name="tokenName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Token Name (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Token Name"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <div className="h-6">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tokenSupply"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Token Supply (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Token Supply"
                          {...field}
                          value={field.value || ""}
                          type="number"
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^\d]/g, "")
                            field.onChange(
                              value === "" ? undefined : parseInt(value)
                            )
                          }}
                        />
                      </FormControl>
                      <div className="h-6">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row items-center justify-between space-x-4">
                <FormField
                  control={form.control}
                  name="releaseDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Release Date (optional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stageId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stage</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Stage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {stages.map((stage, index) => (
                            <SelectItem
                              value={stage.id.toString()}
                              key={`${index}_stage`}
                            >
                              {stage.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="h-6">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isLive"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Is your project live?</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="h-6">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row items-center justify-center space-x-4">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Website (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Website"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <div className="h-6">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="whitepaper"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Whitepaper (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Whitepaper"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <div className="h-6">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <h2 className="mb-6 text-base font-semibold leading-7  ">
                Social Media
              </h2>
              <div className="flex flex-row items-center justify-center space-x-4">
                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Twitter (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Twitter"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <div className="h-6">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discord"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Discord (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Discord"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <div className="h-6">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row items-center justify-center space-x-4">
                <FormField
                  control={form.control}
                  name="telegram"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Telegram (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Telegram"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <div className="h-6">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-row items-center justify-center space-x-4">
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Contact Name (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Contact Name"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <div className="h-6">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Contact Email (optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Contact Email"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <div className="h-6">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <h2 className="mb-6 text-base font-semibold leading-7  ">
                Tags (select up to 3)
              </h2>
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="sr-only text-base">Tags</FormLabel>
                    </div>
                    {tags.map((tag) => (
                      <div
                        key={tag.id}
                        className="flex flex-row items-start space-x-3"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(tag.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                // Add the tag if less than 3 are already selected
                                if (field.value.length < 3) {
                                  field.onChange([...field.value, tag.id])
                                }
                              } else {
                                // Remove the tag from the selection
                                field.onChange(
                                  field.value.filter(
                                    (value) => value !== tag.id
                                  )
                                )
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {tag.name}
                        </FormLabel>
                      </div>
                    ))}
                    {/* Additional dropdown to select the main tag from the selected tags */}
                    {field.value && field.value.length > 0 && (
                      <FormItem>
                        <FormLabel>Main Tag:</FormLabel>
                        <select
                          value={String(form.watch("mainTagId"))}
                          onChange={(e) =>
                            form.setValue("mainTagId", Number(e.target.value))
                          }
                        >
                          <option value="">Select the main tag</option>
                          {field.value.map((selectedTagId) => {
                            const tag = tags.find(
                              (tag) => tag.id === selectedTagId
                            )
                            return (
                              <option key={tag?.id} value={tag?.id}>
                                {tag?.name}
                              </option>
                            )
                          })}
                        </select>
                      </FormItem>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </form>
      </Form>

      {/* Navigation */}
      <div className="mt-8">
        <div className="flex justify-between">
          {currentStep > 0 ? (
            <Button
              type="button"
              onClick={prev}
              disabled={currentStep === 0 || isSubmitting}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </Button>
          ) : (
            <div></div>
          )}
          <Button type="button" onClick={next} disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            )}
          </Button>
        </div>
      </div>
    </section>
  )
}
