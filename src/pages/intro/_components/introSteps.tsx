interface Props {
  position: number;
  textBold: string;
  text: string;
}

export const IntroSteps = ({ position, textBold, text }: Props) => (
  <div className="flex items-start space-x-4">
    <div className="flex items-center rounded-full border border-orange-200">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50">
        <span className="p-4 text-xl font-medium text-orange-500">
          {position}
        </span>
      </div>
    </div>
    <p className="text-left text-sm font-medium text-neutral-500">
      <span className="mr-1 text-neutral-950">{textBold}</span>
      {text}
    </p>
  </div>
);
