"use client";

import Loading from "@/app/components/Loading";
import { getProjectById } from "@/lib/features/projects";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { use, useEffect } from "react";

interface PageProps {
  params: Promise<{
    idProject: string;
  }>;
}

function Page({ params }: PageProps) {
  const { idProject } = use(params);
  const dispatch = useAppDispatch();

  const { token, logged } = useAppSelector((state) => state.auth);
  const project = useAppSelector(
    (state) => state.projects.fullProjects[idProject]
  );

  useEffect(() => {
    if (idProject && token && logged) {
      dispatch(getProjectById({ id: idProject, token }));
    }
  }, [idProject, token, logged, dispatch]);

  if (!project) {
    return <Loading />;
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <div>Usuarios: {project.users?.length}</div>
    </div>
  );
}

export default Page;
