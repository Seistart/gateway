"use client"

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/utils/tailwind.utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Switch } from "../ui/switch"
import { Textarea } from "../ui/textarea"

export default function DashboardCreateProjectForm() {
  // Initialize the form hook

  const formSchema = z.object({
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
    tokenSupply: z.number().optional(),
    tokenName: z.string().optional(),
    website: z.string().optional(),
    whitepaper: z.string().optional(),
    stage: z.enum(["devnet", "testnet", "mainnet", "none"]).optional(),
    releaseDate: z.date().optional(),
    isLive: z.boolean().optional(),
    twitter: z.string().optional(),
    discord: z.string().optional(),
    telegram: z.string().optional(),
    contactName: z.string().optional(),
    contactEmail: z.string().optional(),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      tokenName: "",
      tokenSupply: 0,
      releaseDate: undefined,
      summary: "",
      isLive: false,
      stage: undefined,
      description: "",
      website: "",
      whitepaper: "",
      twitter: "",
      discord: "",
      telegram: "",
      contactName: "",
      contactEmail: "",
    },
  })

  // Function to handle form submission
  const onSubmit = async (data: any) => {
    // Here you can handle your form submission, for example sending data to an API
    console.log(data)
    // Perform additional actions like redirection or state updates as needed
  }

  // Render the form
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-row items-center justify-center space-x-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Project Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Project Name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Project Slug*</FormLabel>
                <FormControl>
                  <Input placeholder="Project Slug" {...field} />
                </FormControl>
                <FormDescription>This is the url</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Project Name*</FormLabel>
              <FormControl>
                <Textarea placeholder="Project Summary" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Project Slug*</FormLabel>
              <FormControl>
                <Textarea placeholder="Project Description" {...field} />
              </FormControl>
              <FormDescription>This is the url</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row items-center justify-center space-x-4">
          <FormField
            control={form.control}
            name="tokenName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Token Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Token Name"
                    {...field}
                    value={field.value}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tokenSupply"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Token Supply</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Token Supply"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>This is the url</FormDescription>
                <FormMessage />
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
                <FormLabel>Release Date</FormLabel>
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
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Stage</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your projects stage" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="devnet">Devnet</SelectItem>
                    <SelectItem value="testnet">Testnet</SelectItem>
                    <SelectItem value="mainnent">Mainnet</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage email addresses in your
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isLive"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is Live</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>This is the url</FormDescription>
                <FormMessage />
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
                <FormLabel>Project Website</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Project Website"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="whitepaper"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Project Whitepaper</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Token Supply"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>This is the url</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row items-center justify-center space-x-4">
          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Project Twitter</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Project Twitter"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discord"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Project Discord</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Project Discord"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>This is the url</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telegram"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Project Telegram</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Token Supply"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>This is the url</FormDescription>
                <FormMessage />
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
                <FormLabel>Contact Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Contact Name"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Contact Email"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>This is the url</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}
