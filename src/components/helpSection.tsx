import { GoToIcon } from 'icons/goToIcon';

interface HelpLinkProps {
  href: string;
  label: string;
}

const HelpLink = ({ href, label }: HelpLinkProps) => (
  <a
    href={href}
    rel="noopener noreferrer"
    target="_blank"
    className="flex cursor-pointer items-center"
  >
    <span className="ml-4 mr-1 text-orange-500">{label}</span>
    <GoToIcon />
  </a>
);

export const HelpSection = () => (
  <p className="flex items-center justify-center pb-4 text-center text-sm font-normal text-zinc-500">
    <span>Need help?</span>
    <HelpLink
      href={`${
        import.meta.env.VITE_HEMI_DOCS_URL
      }/how-to-tutorials/pop-mining/web-based-pop-miner`}
      label="Read docs"
    />
    <HelpLink href={import.meta.env.VITE_HEMI_DISCORD_URL} label="Contact us" />
  </p>
);
