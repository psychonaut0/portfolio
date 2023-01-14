import { SiAdobephotoshop, SiAdobepremierepro, SiAngular, SiArchlinux, SiCplusplus, SiDocker, SiExpress, SiFigma, SiFirebase, SiGithub, SiGnubash, SiJavascript, SiMongodb, SiNextdotjs, SiNginx, SiNodedotjs, SiPortainer, SiPostgresql, SiPython, SiReact, SiTailwindcss, SiTypescript, SiWordpress } from "react-icons/si";
import { BsArrowLeft} from "react-icons/bs"

export function Icon({name, size, className}) {
  
  const icons = {
    angular: <SiAngular className={className} size={size} />,
    bash: <SiGnubash className={className} size={size}/>,
    cpp: <SiCplusplus className={className} size={size}/>,
    docker: <SiDocker className={className} size={size}/>,
    express: <SiExpress className={className} size={size}/>,
    figma: <SiFigma className={className} size={size}/>,
    firebase: <SiFirebase className={className} size={size}/>,
    javascript: <SiJavascript className={className} size={size}/>,
    linux: <SiArchlinux className={className} size={size}/>,
    mongodb: <SiMongodb className={className} size={size}/>,
    nextjs: <SiNextdotjs className={className} size={size}/>,
    nginx: <SiNginx className={className} size={size}/>,
    node: <SiNodedotjs className={className} size={size}/>,
    photoshop: <SiAdobephotoshop className={className} size={size}/>,
    portainer: <SiPortainer className={className} size={size}/>,
    postgresql: <SiPostgresql className={className} size={size}/>,
    premiere: <SiAdobepremierepro className={className} size={size}/>,
    python: <SiPython className={className} size={size}/>,
    react: <SiReact className={className} size={size}/>,
    tailwind: <SiTailwindcss className={className} size={size}/>,
    typescript: <SiTypescript className={className} size={size}/>,
    wordpress: <SiWordpress className={className} size={size}/>,
    back: <BsArrowLeft className={className} size={size} />,
    github: <SiGithub className={className} size={size} />
  }

  return icons[name] || null
}
