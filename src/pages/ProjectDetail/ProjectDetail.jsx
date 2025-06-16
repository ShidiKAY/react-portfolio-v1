import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import Head from "react-helmet";
import { useEffect, useState } from "react";

const ProjectDetail = () => {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const project = t(`projects.${projectId}`, { returnObjects: true });

  if (!project) {
    return <div>Project not found.</div>;
  }

  const technologies = project.technologies || [];
  const externalLinks = project.externalLinks || [];
  const challenges = project.challenges || [];
  const solutions = project.solutions || [];

  return (
    <div className="relative min-h-screen">
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-blue-500 transition-all duration-150"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Fixed back button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>
      </div>

      <div className="container mx-auto py-8 px-4">
        <Head>
          <title>
            {project.introduction.name} Project - Kamal Ait Yous Portfolio
          </title>
          <meta name="description" content={project.description} />
        </Head>

        <h1 className="text-4xl font-bold mb-6 mt-12">
          {project.introduction.name}
        </h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Context</h2>
          <p className="text-gray-700">{project.introduction.introduction}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">My Role</h2>
          <p className="text-gray-700">{project.introduction.description}</p>
        </div>

        {project.tasks && project.tasks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Key Actions & Impact
            </h2>
            {project.tasks.map((taskGroup, groupIndex) => (
              <div
                key={groupIndex}
                className="mb-6 bg-blue-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-xl font-bold mb-3">
                  {taskGroup.group.titre}
                </h3>
                {taskGroup.group.intro && (
                  <p className="mb-4 text-gray-700">{taskGroup.group.intro}</p>
                )}
                <ul className="list-disc pl-5 space-y-2">
                  {Object.keys(taskGroup.data).map((taskId, dataIndex) => (
                    <li key={dataIndex} className="text-gray-700">
                      <span className="font-semibold">
                        {taskGroup.data[taskId].title}:{" "}
                      </span>
                      {taskGroup.data[taskId].description.join(" ")}
                      {taskGroup.data[taskId].img && (
                        <img
                          src={taskGroup.data[taskId].img}
                          alt={taskGroup.data[taskId].title}
                          className="mt-4 max-w-full h-auto rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {technologies.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>
        )}

        {challenges.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Key Challenges</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {challenges.map((challenge, index) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>
          </div>
        )}

        {solutions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">
              Solutions Implemented
            </h2>
            <ul className="list-disc pl-5 text-gray-700">
              {solutions.map((solution, index) => (
                <li key={index}>{solution}</li>
              ))}
            </ul>
          </div>
        )}

        {externalLinks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">External Links</h2>
            <ul className="list-disc pl-5">
              {externalLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
