const handleResponse = async (response) => {
  if (response.ok) {
    return response.json();
  }

  let message = "Request failed";
  try {
    const data = await response.json();
    message = data?.message || message;
  } catch (error) {
    
  }

  throw new Error(message);
};

export const getApi = async (url) => {
  const response = await fetch(url, { cache: "no-store" });
  return handleResponse(response);
};

export const postApi = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse(response);
};

export const putApi = async (url, body) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse(response);
};

export const deleteApi = async (url) => {
  const response = await fetch(url, { method: "DELETE" });
  if (response.status === 204) return true;
  if (!response.ok) {
    let message = "Request failed";
    try {
      const data = await response.json();
      message = data?.message || message;
    } catch (_error) {
      
    }
    throw new Error(message);
  }

  try {
    return await response.json();
  } catch (_error) {
    return true;
  }
};
