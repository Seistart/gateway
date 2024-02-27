import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/(app)/dashboard/projects/useOptimisticProjects";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";

import { type Project, insertProjectParams } from "@/lib/db/schema/projects";
import {
  createProjectAction,
  deleteProjectAction,
  updateProjectAction,
} from "@/lib/actions/projects";

const ProjectForm = ({
  project,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  project?: Project | null;

  openModal?: (project?: Project) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Project>(insertProjectParams);
  const editing = !!project?.id;

  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("projects");

  const onSuccess = (
    action: Action,
    data?: { error: string; values: Project }
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      openModal && openModal(data?.values);
      toast.error(`Failed to ${action}`, {
        description: data?.error ?? "Error",
      });
    } else {
      router.refresh();
      postSuccess && postSuccess();
      toast.success(`Project ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const projectParsed = await insertProjectParams.safeParseAsync({
      ...payload,
    });
    if (!projectParsed.success) {
      setErrors(projectParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = projectParsed.data;
    const pendingProject: Project = {
      updatedAt: project?.updatedAt ?? new Date(),
      createdAt: project?.createdAt ?? new Date(),
      id: project?.id ?? "",
      userId: project?.userId ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic &&
          addOptimistic({
            data: pendingProject,
            action: editing ? "update" : "create",
          });

        const error = editing
          ? await updateProjectAction({ ...values, id: project.id })
          : await createProjectAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingProject,
        };
        onSuccess(
          editing ? "update" : "create",
          error ? errorFormatted : undefined
        );
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(e.flatten().fieldErrors);
      }
    }
  };

  return (
    <form action={handleSubmit} onChange={handleChange} className={"space-y-8 h-[50vh] overflow-scroll"}>
      {/* Schema fields start */}
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.projectName ? "text-destructive" : ""
          )}
        >
          Project Name
        </Label>
        <Input
          type="text"
          name="projectName"
          className={cn(errors?.projectName ? "ring ring-destructive" : "")}
          defaultValue={project?.projectName ?? ""}
        />
        {errors?.projectName ? (
          <p className="text-xs text-destructive mt-2">
            {errors.projectName[0]}
          </p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.tokenName ? "text-destructive" : ""
          )}
        >
          Token Name
        </Label>
        <Input
          type="text"
          name="tokenName"
          className={cn(errors?.tokenName ? "ring ring-destructive" : "")}
          defaultValue={project?.tokenName ?? ""}
        />
        {errors?.tokenName ? (
          <p className="text-xs text-destructive mt-2">{errors.tokenName[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.tokenSupply ? "text-destructive" : ""
          )}
        >
          Token Supply
        </Label>
        <Input
          type="text"
          name="tokenSupply"
          className={cn(errors?.tokenSupply ? "ring ring-destructive" : "")}
          defaultValue={project?.tokenSupply ?? ""}
        />
        {errors?.tokenSupply ? (
          <p className="text-xs text-destructive mt-2">
            {errors.tokenSupply[0]}
          </p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.projectRelease ? "text-destructive" : ""
          )}
        >
          Project Release
        </Label>
        <Input
          type="text"
          name="projectRelease"
          className={cn(errors?.projectRelease ? "ring ring-destructive" : "")}
          defaultValue={project?.projectRelease ?? ""}
        />
        {errors?.projectRelease ? (
          <p className="text-xs text-destructive mt-2">
            {errors.projectRelease[0]}
          </p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.projectType ? "text-destructive" : ""
          )}
        >
          Project Type
        </Label>
        <Input
          type="text"
          name="projectType"
          className={cn(errors?.projectType ? "ring ring-destructive" : "")}
          defaultValue={project?.projectType ?? ""}
        />
        {errors?.projectType ? (
          <p className="text-xs text-destructive mt-2">
            {errors.projectType[0]}
          </p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.projectSummary ? "text-destructive" : ""
          )}
        >
          Project Summary
        </Label>
        <Input
          type="text"
          name="projectSummary"
          className={cn(errors?.projectSummary ? "ring ring-destructive" : "")}
          defaultValue={project?.projectSummary ?? ""}
        />
        {errors?.projectSummary ? (
          <p className="text-xs text-destructive mt-2">
            {errors.projectSummary[0]}
          </p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.projectDescription ? "text-destructive" : ""
          )}
        >
          Project Description
        </Label>
        <Input
          type="text"
          name="projectDescription"
          className={cn(
            errors?.projectDescription ? "ring ring-destructive" : ""
          )}
          defaultValue={project?.projectDescription ?? ""}
        />
        {errors?.projectDescription ? (
          <p className="text-xs text-destructive mt-2">
            {errors.projectDescription[0]}
          </p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.urlWebsite ? "text-destructive" : ""
          )}
        >
          Url Website
        </Label>
        <Input
          type="text"
          name="urlWebsite"
          className={cn(errors?.urlWebsite ? "ring ring-destructive" : "")}
          defaultValue={project?.urlWebsite ?? ""}
        />
        {errors?.urlWebsite ? (
          <p className="text-xs text-destructive mt-2">
            {errors.urlWebsite[0]}
          </p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.urlWhitepaper ? "text-destructive" : ""
          )}
        >
          Url Whitepaper
        </Label>
        <Input
          type="text"
          name="urlWhitepaper"
          className={cn(errors?.urlWhitepaper ? "ring ring-destructive" : "")}
          defaultValue={project?.urlWhitepaper ?? ""}
        />
        {errors?.urlWhitepaper ? (
          <p className="text-xs text-destructive mt-2">
            {errors.urlWhitepaper[0]}
          </p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.urlTwitter ? "text-destructive" : ""
          )}
        >
          Url Twitter
        </Label>
        <Input
          type="text"
          name="urlTwitter"
          className={cn(errors?.urlTwitter ? "ring ring-destructive" : "")}
          defaultValue={project?.urlTwitter ?? ""}
        />
        {errors?.urlTwitter ? (
          <p className="text-xs text-destructive mt-2">
            {errors.urlTwitter[0]}
          </p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.urlDiscord ? "text-destructive" : ""
          )}
        >
          Url Discord
        </Label>
        <Input
          type="text"
          name="urlDiscord"
          className={cn(errors?.urlDiscord ? "ring ring-destructive" : "")}
          defaultValue={project?.urlDiscord ?? ""}
        />
        {errors?.urlDiscord ? (
          <p className="text-xs text-destructive mt-2">
            {errors.urlDiscord[0]}
          </p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.urlTelegram ? "text-destructive" : ""
          )}
        >
          Url Telegram
        </Label>
        <Input
          type="text"
          name="urlTelegram"
          className={cn(errors?.urlTelegram ? "ring ring-destructive" : "")}
          defaultValue={project?.urlTelegram ?? ""}
        />
        {errors?.urlTelegram ? (
          <p className="text-xs text-destructive mt-2">
            {errors.urlTelegram[0]}
          </p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.urlReddit ? "text-destructive" : ""
          )}
        >
          Url Reddit
        </Label>
        <Input
          type="text"
          name="urlReddit"
          className={cn(errors?.urlReddit ? "ring ring-destructive" : "")}
          defaultValue={project?.urlReddit ?? ""}
        />
        {errors?.urlReddit ? (
          <p className="text-xs text-destructive mt-2">{errors.urlReddit[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.urlFacebook ? "text-destructive" : ""
          )}
        >
          Url Facebook
        </Label>
        <Input
          type="text"
          name="urlFacebook"
          className={cn(errors?.urlFacebook ? "ring ring-destructive" : "")}
          defaultValue={project?.urlFacebook ?? ""}
        />
        {errors?.urlFacebook ? (
          <p className="text-xs text-destructive mt-2">
            {errors.urlFacebook[0]}
          </p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.contactName ? "text-destructive" : ""
          )}
        >
          Contact Name
        </Label>
        <Input
          type="text"
          name="contactName"
          className={cn(errors?.contactName ? "ring ring-destructive" : "")}
          defaultValue={project?.contactName ?? ""}
        />
        {errors?.contactName ? (
          <p className="text-xs text-destructive mt-2">
            {errors.contactName[0]}
          </p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.contactEmail ? "text-destructive" : ""
          )}
        >
          Contact Email
        </Label>
        <Input
          type="text"
          name="contactEmail"
          className={cn(errors?.contactEmail ? "ring ring-destructive" : "")}
          defaultValue={project?.contactEmail ?? ""}
        />
        {errors?.contactEmail ? (
          <p className="text-xs text-destructive mt-2">
            {errors.contactEmail[0]}
          </p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      {/* Schema fields end */}

      {/* Save Button */}
      <SaveButton errors={hasErrors} editing={editing} />

      {/* Delete Button */}
      {editing ? (
        <Button
          type="button"
          disabled={isDeleting || pending || hasErrors}
          variant={"destructive"}
          onClick={() => {
            setIsDeleting(true);
            closeModal && closeModal();
            startMutation(async () => {
              addOptimistic &&
                addOptimistic({ action: "delete", data: project });
              const error = await deleteProjectAction(project.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: project,
              };

              onSuccess("delete", error ? errorFormatted : undefined);
            });
          }}
        >
          Delete{isDeleting ? "ing..." : "e"}
        </Button>
      ) : null}
    </form>
  );
};

export default ProjectForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing: Boolean;
  errors: boolean;
}) => {
  const { pending } = useFormStatus();
  const isCreating = pending && editing === false;
  const isUpdating = pending && editing === true;
  return (
    <Button
      type="submit"
      className="mr-2"
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}
    >
      {editing
        ? `Sav${isUpdating ? "ing..." : "e"}`
        : `Creat${isCreating ? "ing..." : "e"}`}
    </Button>
  );
};
