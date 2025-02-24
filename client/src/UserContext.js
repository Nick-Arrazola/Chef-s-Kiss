// Import necessary React functions
import { createContext, useContext, useState } from "react";
// "createContext()"" creates a new context called "UserContext" which will be used 
// to store and share user-related data across the application without passing props manually.

// "useContext()" is a React Hook that allows components to access values from a context without needing
// to pass props manually through every level of the component tree.

export const UserContext = createContext();

// `UserProvider` is a component that will wrap around parts of the app that need access to user data.
export function UserProvider ({children}) {
    // Creating a state variable to store user information
    // `user` will store the user's data (e.g., username, email, etc.)
    // `setUser` is a function that will allow us to update the `user` state
    const [user, setUser] = useState(null); // Initially, the user is `null` (not logged in)

    console.log("In UserContext");                                                                    // !Delete Later
    console.log(user);                                                                                // !Delete Later

    return (
        // The `UserContext.Provider` component makes "user" and "setUser" available 
        // to any component that needs it inside the application.
        <UserContext.Provider value={{ user, setUser }}>
            {/* The `{children}` represents all components wrapped inside <UserProvider> */}
            {children}
        </UserContext.Provider>
    );
} 