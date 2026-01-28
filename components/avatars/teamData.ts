// Team member data configuration
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  color: string; // Primary color for the avatar
  accentColor: string; // Secondary color
  avatarImage?: string; // Optional: path to avatar image
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Arbab Riffat Shahnawaz",
    role: "Backend Developer & DB Manager",
    color: "#E59866", // Orange/tan (like first reference)
    accentColor: "#D35400",
    avatarImage: "/avatars/arbab.png"
  },
  {
    id: 2,
    name: "Abdul Sheikh Zeeshan",
    role: "Frontend Developer",
    color: "#AF7AC5", // Purple (like second reference)
    accentColor: "#7D3C98",
    avatarImage: "/avatars/abdul.png"
  },
  {
    id: 3,
    name: "Lakshya Parmar",
    role: "Backend Developer",
    color: "#73C6B6", // Teal/green (like third reference)
    accentColor: "#16A085",
    avatarImage: "/avatars/lakshya.png"
  },
  {
    id: 4,
    name: "Ayush Kumar Parghania",
    role: "UI/UX Designer",
    color: "#5DADE2", // Blue
    accentColor: "#2874A6",
    avatarImage: "/avatars/ayush.png"
  }
];
