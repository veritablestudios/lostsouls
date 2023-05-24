import { Button } from "../components";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className=" text-3xl font-bold tracking-tight sm:text-5xl text-neutral-50 font-poppins">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl text-neutral-50 font-poppins">
          page not found
        </h1>
        <p className="mt-6 leading-7 text-neutral-50 font-poppins text-lg lowercase">
          We do not allow page refreshes for payment-related pages for security
          reasons. You can get to other sections of the site by using the menu.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            btnName="&larr; go back"
            classStyles="rounded-xl"
            onClick={() => router.back()}
          />
          <a href="" className="text-sm font-semibold text-white font-poppins">
            contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}
