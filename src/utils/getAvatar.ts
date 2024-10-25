import { config } from "@/data/site-config";
import md5 from "md5-ts";

export default function getAvatar(email: string = "test@example.com"): string {
	return `${config.gravatar_mirror}${md5(email)}`;
}
