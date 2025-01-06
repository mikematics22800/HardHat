const base = 'https://hardhat-waji.onrender.com/api';

export const fetchUsers = async () => {
  const response = await fetch(`${base}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
};

// Fetch a single user by ID
export const fetchUserById = async (id) => {
  const response = await fetch(`${base}/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
};

// Create a new user
export const createUser = async (user) => {
  const response = await fetch(`${base}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
};

// Update a user by ID
export const updateUser = async (id, updates) => {
  const response = await fetch(`${base}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
};

// Delete a user by ID
export const deleteUser = async (id) => {
  const response = await fetch(`${base}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
};