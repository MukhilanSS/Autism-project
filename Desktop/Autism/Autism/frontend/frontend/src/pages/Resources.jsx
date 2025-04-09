import { Link } from 'react-router-dom';
import '../styles/main.css';

export default function Resources() {
  const resources = [
    {
      title: "Autism Speaks",
      description: "Comprehensive resource for autism information, tools, and support",
      url: "https://www.autismspeaks.org/",
      category: "General Information"
    },
    {
      title: "National Institute of Mental Health",
      description: "Research-based information about autism spectrum disorders",
      url: "https://www.nimh.nih.gov/health/topics/autism-spectrum-disorders-asd",
      category: "Research"
    },
    {
      title: "Autism Society",
      description: "Advocacy and support organization with local chapters",
      url: "https://autismsociety.org/",
      category: "Support"
    },
    {
      title: "CDC Autism Resources",
      description: "Government resources for autism information and data",
      url: "https://www.cdc.gov/ncbddd/autism/index.html",
      category: "Official Guidelines"
    }
  ];

  return (
    <div className="resources-container">
      <div className="page-header">
        <h1>Autism Resources</h1>
        <p>Helpful organizations and information sources</p>
      </div>

      <div className="resource-categories">
        <div className="category-card">
          <h3>Understanding Autism</h3>
          <p>Learn about autism spectrum disorder, its characteristics, and diagnosis</p>
        </div>
        <div className="category-card">
          <h3>Support Networks</h3>
          <p>Connect with communities and organizations that can help</p>
        </div>
        <div className="category-card">
          <h3>Professional Help</h3>
          <p>Find specialists and treatment options</p>
        </div>
      </div>

      <div className="resources-list">
        <h2>Recommended Resources</h2>
        <div className="resource-grid">
          {resources.map((resource, index) => (
            <div className="resource-card" key={index}>
              <div className="resource-content">
                <span className="resource-category">{resource.category}</span>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
              </div>
              <a 
                href={resource.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="resource-link"
              >
                Visit Website
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="additional-help">
        <h3>Need more personalized help?</h3>
        <p>Our team can guide you to local resources and specialists</p>
        <Link to="/contact" className="help-link">
          Contact Us
        </Link>
      </div>
    </div>
  );
}