// API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000');

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Contact form submission
  async submitContact(formData) {
    return this.request('/api/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/api/health');
  }

  // Get projects
  async getProjects() {
    return this.request('/api/projects');
  }

  // Get skills
  async getSkills() {
    return this.request('/api/skills');
  }
}

export default new ApiService();