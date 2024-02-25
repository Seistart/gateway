"use client";

import { Input } from "@/components/ui/input";
import { ProjectStatus, ProjectTags } from "@/types";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { ComboBox } from "@/components/Combobox";
import { useProjects } from "@/hooks";

export default function Categories() {
  const {
    setSearchTerm,
    filteredProjects,
    searchTerm,
    filter,
    setTagFilter,
    setStatusFilter,
    resetFilter,
  } = useProjects();
  const tagValues = Object.values(ProjectTags).map((tag) => ({
    value: tag.toLowerCase(),
    label: tag,
  }));
  const statusValues = Object.values(ProjectStatus).map((status) => ({
    value: status.toLowerCase(),
    label: status,
  }));

  useEffect(() => {
    return () => {
      resetFilter();
    };
  }, [resetFilter]);

  return (
    <div className="container mx-auto items-center">
      {filter.tag}
      <div className="text-4xl text-center my-20">
        Discover SEI&#39;s most innovating projects
        <div className="text-2xl text-center mt-10 mx-auto max-w-[900px]">
          Search through our leading platform to find new innovations in this
          fast growing ecosystem
        </div>
      </div>
      <Input
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        type="text"
        value={searchTerm}
      ></Input>
      <ComboBox
        items={tagValues}
        value={filter.tag}
        setValue={setTagFilter}
        selectPlaceHolder="Select Tag..."
        searchPlaceHolder="Search Tag..."
      ></ComboBox>
      <ComboBox
        items={statusValues}
        value={filter.status}
        setValue={setStatusFilter}
        selectPlaceHolder="Select Status..."
        searchPlaceHolder="Search Status..."
      ></ComboBox>
      <div className="grid grid-cols-2 mx-auto place-items-center">
        {filteredProjects.map((project, index) => (
          <Button variant={"white"} className="min-w-[400px]" key={index}>
            <div className="flex flex-col">
              <div>{project.projectName}</div>
              <div> {project.tags.toString()}</div>
              <div> {project.status}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
