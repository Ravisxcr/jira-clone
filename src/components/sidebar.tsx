import Link from "next/link";
import Image from "next/image";
import { DottedSeperator } from "./dotted-seperator";
import { Navigation } from "./navigation";

const Sidebar = () => {
	return (
		<aside className="h-full bg-neutral-100 p-4 w-full">
			<Link href="/">
				<Image src="logo.svg" alt="logo.svg" width={100} height={20} />
			</Link>
			<DottedSeperator className="my-4" />
			<Navigation />
		</aside>
	);
};

export default Sidebar;