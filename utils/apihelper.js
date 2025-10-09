import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

const getToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return token;
  }
  return null;
};


// =========================
// 🔐 Login API
// =========================
export const login = async (data) => {
  try {
    const response = await api.post("/employees/users/login", data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || "Something went wrong",
      };
    }
    return { status: false, message: "Network error" };
  }
};

// =========================
// 📝 Register API (multipart form-data)
// =========================
export const register = async ({ fullName, email, phone, designation, password, resume, whatsappAlerts }) => {
  try {
    const formData = new FormData();
    formData.append("full_name", fullName || "");
    formData.append("email", email || "");
    formData.append("phone_number", phone || "");
    if (password) formData.append("password", password);
    formData.append("designation", designation || "");
    formData.append("whatsapp_alert", String(Boolean(whatsappAlerts)));
    if (resume) {
      formData.append("resume", resume);
    }

    // Let axios set Content-Type (with boundary) for multipart/form-data
    const response = await api.post("/employees/users", formData, {
      // no explicit Content-Type
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || "Something went wrong",
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: "Network error" };
  }
};

// =========================
// 📝 Profile Details API (multipart form-data)
// =========================
export const submitProfileDetails = async ({ personalData, educationEntries, workEntries, selectedSkills, selectedCertifications, resume }) => {
  try {
    const token = getToken();

    const formData = new FormData();
    // Personal
    formData.append('first_name', personalData.firstName);
    formData.append('last_name', personalData.lastName);
    formData.append('email', personalData.email);
    formData.append('country', personalData.country);
    formData.append('state', personalData.state);
    formData.append('city', personalData.city);
    formData.append('designation', personalData.designation);
    formData.append('mobile', personalData.mobile);
    formData.append('whatsapp_alert', String(Boolean(personalData.whatsappAlerts)));
    // Education
    formData.append('education', JSON.stringify(educationEntries));
    // Work
    formData.append('work', JSON.stringify(workEntries));
    // Skills/Certifications
    formData.append('skills', JSON.stringify(selectedSkills));
    formData.append('certifications', JSON.stringify(selectedCertifications));
    // Resume
    if (resume) formData.append('resume', resume);

    // Let Axios set Content-Type with the proper boundary
    const response = await api.post('/employees/users/profile-details', formData, {
     headers: {
        "employee-token": token || "",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

// =========================
// 📝 Fetch Profile Details API
// =========================
export const fetchProfileDetails = async () => {
  try {
    const token = getToken();
    const response = await api.get('/employees/users/get-detail', {
      headers: {
        "employee-token": token || "",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

// =========================
// 📚 Public lookups (no auth required)
// =========================
export const fetchSkills = async () => {
  try {
    // Assumes an endpoint that returns available skills
    const response = await api.get('/common/skills');
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

export const fetchCertifications = async () => {
  try {
    // Assumes an endpoint that returns available certifications
    const response = await api.get('/common/certificates');
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};



export const fetchstates = async () => {
  try {
    // Assumes an endpoint that returns available certifications
    const response = await api.get('/common/states');
    
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};


export const getcity = async (state_name) => {
  try {
    const response = await api.post('/common/cities', { state_name });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        status: false,
        message: error.response.data.message || 'Something went wrong',
        errors: error.response.data.errors || undefined,
      };
    }
    return { status: false, message: 'Network error' };
  }
};

