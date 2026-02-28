import satori from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";

function getRatingColor(r) {
  if (r <= 3) return "#dc2626"; // red-600
  if (r <= 5) return "#ea580c"; // orange-600
  if (r <= 7) return "#d97706"; // amber-600
  if (r <= 9) return "#16a34a"; // green-600
  return "#6d28d9"; // violet-700
}

function getRatingLabel(r) {
  if (r <= 3) return "Bad";
  if (r <= 5) return "Below Average";
  if (r <= 7) return "Good";
  if (r <= 9) return "Great";
  return "Essential";
}

export default async review => {
  const { title, artist, rating, genre } = review.data;
  const ratingColor = getRatingColor(rating);
  const ratingLabel = getRatingLabel(rating);
  const genreText = Array.isArray(genre) ? genre.join(" / ") : genre;

  return satori(
    {
      type: "div",
      props: {
        style: {
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 56px",
          fontFamily: "IBM Plex Serif",
          color: "#ededed",
        },
        children: [
          // Top section: Artist + Album
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              },
              children: [
                {
                  type: "p",
                  props: {
                    style: {
                      fontSize: 32,
                      color: "#b91c1c",
                      fontWeight: 600,
                      margin: 0,
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      fontFamily: "Space Mono",
                    },
                    children: artist,
                  },
                },
                {
                  type: "p",
                  props: {
                    style: {
                      fontSize: 64,
                      fontWeight: 700,
                      margin: 0,
                      maxHeight: "240px",
                      overflow: "hidden",
                      lineHeight: 1.1,
                    },
                    children: title,
                  },
                },
              ],
            },
          },
          // Bottom section: Rating + Genre + Site
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                width: "100%",
              },
              children: [
                // Rating badge
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            width: "96px",
                            height: "96px",
                            background: ratingColor,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 56,
                            fontWeight: 700,
                            fontFamily: "Space Mono",
                            color: "#fff",
                          },
                          children: String(rating),
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                          },
                          children: [
                            {
                              type: "span",
                              props: {
                                style: {
                                  fontSize: 28,
                                  fontWeight: 700,
                                  color: ratingColor,
                                  fontFamily: "Space Mono",
                                },
                                children: ratingLabel,
                              },
                            },
                            {
                              type: "span",
                              props: {
                                style: {
                                  fontSize: 20,
                                  color: "#999",
                                },
                                children: genreText,
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                // Site name
                {
                  type: "span",
                  props: {
                    style: {
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#666",
                      fontFamily: "Space Mono",
                    },
                    children: SITE.title,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(
        title + artist + ratingLabel + genreText + SITE.title + rating
      ),
    }
  );
};
