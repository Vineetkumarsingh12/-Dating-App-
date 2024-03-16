import Link from "next/link";

export const StyledLink = ({ href, children }) => 

<Link href
={href}>
  <a>{children}</a>
</Link>;
