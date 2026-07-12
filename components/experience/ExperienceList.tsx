"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

function formatDuration(startDateStr: string, endDateStr: string | null) {
  if (!startDateStr) return "";

  const formatOptions: Intl.DateTimeFormatOptions = { year: "numeric", month: "short" };
  
  const start = new Date(startDateStr);
  const startFormatted = start.toLocaleDateString("en-US", formatOptions);

  if (!endDateStr) {
    return `${startFormatted} — Present`;
  }

  const end = new Date(endDateStr);
  const now = new Date();
  const endFormatted = end.toLocaleDateString("en-US", formatOptions);

  if (end > now) {
    return `${startFormatted} — Present (Expected: ${endFormatted})`;
  } else {
    return `${startFormatted} — ${endFormatted}`;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ExperienceList({ experience }: { experience: any[] }) {
  if (!experience || experience.length === 0) return null;

  return (
    <div className="mx-auto w-full max-w-[100rem] px-6 lg:px-16">
      <motion.div 
        className="grid grid-cols-1 gap-px bg-border border border-border rounded-xl overflow-hidden shadow-sm"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {experience.map((item, index) => {
          const isInternal = index >= 1; // Any item after the first has a top border

          return (
            <motion.div 
              key={item.id} 
              className="relative w-full h-full"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
            >
              {/* Top border diamond for items other than the first */}
              {isInternal && (
                <div className="absolute -top-[0.5px] left-1/2 md:left-12 w-[10px] h-[10px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-background z-10 border border-border" />
              )}
              
              <div className="bg-background p-6 md:p-10 flex flex-col gap-4 group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {item.role}
                    </h3>
                    <p className="text-lg text-muted-foreground font-medium">
                      {item.company}
                    </p>
                  </div>
                  
                  <div className="text-sm md:text-base font-semibold px-3 py-1 bg-muted rounded-full text-foreground whitespace-nowrap self-start md:self-auto border border-border">
                    {formatDuration(item.start_date, item.end_date)}
                  </div>
                </div>

                {item.description && (
                  <ul className="text-muted-foreground leading-relaxed mt-2 list-disc list-inside space-y-1">
                    {item.description.split('\n').map((point: string, i: number) => {
                      if (!point.trim()) return null;
                      return <li key={i}>{point.trim()}</li>;
                    })}
                  </ul>
                )}

                {item.skills && item.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.skills.map((skill: string, i: number) => (
                      <Badge key={i} variant="secondary" className="font-normal rounded-md px-3 py-1 bg-muted hover:bg-muted/80 text-foreground border-none">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
