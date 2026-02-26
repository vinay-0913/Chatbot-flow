# Chatbot Flow Builder

This is a premium, visual chatbot flow builder built to allow users to easily graph out conversation logic. It features a drag-and-drop interface, live node text editing, and validation logic to prevent disconnected flows.

## 🛠️ Built With

*   **[React](https://react.dev/) (TypeScript):** For building a robust, predictable, and strongly-typed UI architecture.
*   **[Vite](https://vitejs.dev/):** For blazing-fast development server speeds and optimal production builds.
*   **[React Flow](https://reactflow.dev/):** The core engine used for node management, canvas rendering, edges, handles, and viewport controls.
*   **Vanilla CSS:** Custom, conflict-free, premium styling utilizing the Inter font family for modern typography.
*   **[Lucide React](https://lucide.dev/):** For clean, lightweight, consistent SVG icons.

## 🏗️ Architecture Overview

The application is structured entirely modularly:

1.  **State Management:** Governed primarily in `App.tsx` utilizing React Flow's native `useNodesState` and `useEdgesState`.
2.  **Extensibility:** The "Nodes Panel" relies on a configurable `nodeTypes` mapping. Currently, it supports the `TextNode`, but new node architectures can be snapped in without rewriting core drag-and-drop logic.
3.  **Validation Engine:** When saving, an algorithmic check inspects all node relationships (`edges.target`) against instantiated `nodes`. It identifies disconnected nodes (nodes lacking an incoming connection) to enforce the "Only One Starting Node" protocol before permitting a payload save.

---

## 📖 How to Use

**Step 1: Open the Application**

Make sure the development server is running (`npm run dev`).
Open your web browser and go to `http://localhost:5173/`.
You will see a canvas area with one default "Send Message" node already on it, and a "Nodes Panel" on the right sidebar.

**Step 2: Add New Nodes**

Look at the Nodes Panel on the right side of the screen. You'll see a draggable item called "Message".
Click and hold the "Message" item, then drag it over to the dotted canvas area.
Release your mouse to drop it. A new "Send Message" node will appear exactly where you dropped it.
You can repeat this to add as many nodes as you need. You can also click and drag existing nodes to rearrange them on the canvas.

**Step 3: Edit Node Messages**

Click once on any node on the canvas to select it. Keep an eye on the right sidebar.
The "Nodes Panel" will slide away, and the "Settings Panel" will take its place.
In the Settings Panel, you will see a text box.
Type your desired message in the text box (e.g., "Hello! How can I help you today?").
As you type, the message inside the node on the canvas will update instantly.
To go back to adding more nodes, click the small Back Arrow (←) at the top of the Settings Panel or simply click anywhere on the empty canvas to deselect the node.

**Step 4: Connect the Nodes**

Every node has two tiny dots (handles) on its sides. The left dot is the Target (incoming), and the right dot is the Source (outgoing).
To dictate the flow of conversation, click and hold the Source handle (right dot) of a node.
Drag your mouse toward the Target handle (left dot) of the next node in the sequence. A connecting line (edge) will follow your mouse.
Release your mouse over the Target handle to create the connection.
Note: A node can only have ONE outgoing connection (source), but it can receive MANY incoming connections (targets).

**Step 5: Save and Validate the Flow**

Once you're happy with your flow, click the blue "Save Changes" button at the top right of the screen.
Validation Rule: The system checks your flow to ensure it makes sense. If you have multiple disconnected nodes floating around (specifically, more than one node that has NO incoming connections pointing to it), an error message will pop up saying "Cannot save Flow". A chatbot flow should ideally only have one clear starting point.
Success: If all your nodes are connected properly, a green "Successfully saved flow!" message will appear.
