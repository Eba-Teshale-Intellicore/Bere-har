"use client";

import { useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();

  return (
    <select onChange={(e) => router.push(`/${e.target.value}`)}>
      <option value="en">English</option>
      <option value="am">አማርኛ</option>
      {/* <option value="om">Afaan Oromoo</option> */}
      {/* <option value="wal">Wolaytta</option> */}
    </select>
  );
}
