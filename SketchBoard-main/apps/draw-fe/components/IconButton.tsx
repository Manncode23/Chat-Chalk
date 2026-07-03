import { ReactNode } from "react";

export function IconButton({
    icon, 
    onClick, 
    activated,
    label
}: {
    icon: ReactNode,
    onClick: () => void,
    activated: boolean,
    label?: string 
}) {
    return (
      <div className="relative group">
        <button 
          onClick={onClick}
          data-active={activated}
          aria-label={label || 'Icon button'}
          className={`
            p-2 rounded-md transition-colors flex items-center justify-center
            border border-transparent
            text-muted-foreground hover:text-foreground
            data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:border-primary/20
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background
          `}
        >
            {icon}
        </button>
        {label && (
          <div 
            className="
              absolute top-full mt-2 left-1/2 -translate-x-1/2 
              px-2 py-1 bg-foreground text-background text-xs font-semibold rounded-md 
              opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
            "
          >
            {label}
          </div>
        )}
      </div>
    );
}