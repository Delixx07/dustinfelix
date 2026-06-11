import type { Profile } from "@/types";

/**
 * 👇 REPLACE this with your own details.
 * Photo: put the file in the /public folder, then set avatar: "/me.jpg".
 * CV: put the file in /public, then set cvUrl: "/cv.pdf".
 */
export const profile: Profile = {
  name: "Dustin Felix",
  role: "Informatics Engineering Student",
  about:
    "Currently in my 6th semester of Informatics at ITS, one of Indonesia's top technical universities. I've spent my academic years doing more than just studying. I build things. From relational databases to responsive web interfaces, my focus lies in crafting web solutions that are both technically sound and meaningfully purposeful, with a growing interest in integrating AI into real-world applications.",
  avatar: "", // e.g. "/me.jpg"
  email: "dustinfelix01@gmail.com@anda.com",
  cvUrl: "", // e.g. "/cv.pdf"
  location: "Indonesia, Surabaya",
  socials: [
    { label: "GitHub", url: "https://github.com/username", icon: "Github" },
    { label: "LinkedIn", url: "https://linkedin.com/in/username", icon: "Linkedin" },
    { label: "Instagram", url: "https://instagram.com/username", icon: "Instagram" },
  ],
};
