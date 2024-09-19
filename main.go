package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
)

type PageData struct {
	Title         string
	Name          string
	LinkedIn      string
	Github        string
	Content       template.HTML
	Bio           template.HTML
	BioImage      string
	BioImageHover string
	HeaderMap     string
	SVGContent    template.HTML
}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/", homeHandler)
	mux.Handle("/client/static/", http.StripPrefix("/client/static/", http.FileServer(http.Dir("client/static"))))

	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
		w.Header().Set("Pragma", "no-cache")
		w.Header().Set("Expires", "0")
		mux.ServeHTTP(w, r)
	})

	corsHandler := handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)(handler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "7575"
	}

	fmt.Printf("Server is running on http://localhost:%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, corsHandler))
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	data := buildHomePageData()
	renderTemplate(w, "index.html", data)
}

func buildHomePageData() PageData {
	svgContent, err := os.ReadFile("client/static/images/map.svg") // Updated this line
	if err != nil {
		log.Printf("Error reading SVG file: %v", err)
		svgContent = []byte("") // Use empty string if file reading fails
	}

	return PageData{
		Title:         "Nicholas Markram - Developer Profile",
		Name:          "Nicholas Markram",
		LinkedIn:      "www.linkedin.com/in/nicholasmarkram",
		Github:        "www.github.com/nicholasmarkram",
		BioImage:      "/client/static/images/profile_pic.jpg",
		BioImageHover: "/client/static/images/profile_pic_hover.jpg",
		Bio:           template.HTML("Your bio goes here..."),
		HeaderMap:     "/client/static/images/map.png",
		SVGContent:    template.HTML(svgContent),
	}
}

var templates = template.Must(template.ParseGlob("client/templates/*.html"))

func renderTemplate(w http.ResponseWriter, tmpl string, data PageData) {
	if err := templates.ExecuteTemplate(w, tmpl, data); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
