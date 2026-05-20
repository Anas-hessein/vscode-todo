<script lang="ts">
    import { onMount } from "svelte";

    let ul: HTMLElement | null = null;
    let inputEl: HTMLInputElement | null = null;
    let addBtn: HTMLElement | null = null;

    function makeCloseButton() {
        const span = document.createElement("span");
        span.className = "close";
        span.textContent = "\u00D7";
        span.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
            const li = target.parentElement;
            if (li && li.parentElement) li.parentElement.removeChild(li);
        });
        return span;
    }

    // top-level function so Svelte's `onclick={newElement}` can find it
    export function newElement() {
        if (!inputEl || !ul) return;
        const value = inputEl.value.trim();
        if (!value) {
            alert("You must write something!");
            return;
        }

        const li = document.createElement("li");
        li.textContent = value;
        li.appendChild(makeCloseButton());
        ul.appendChild(li);
        inputEl.value = "";
    }

    onMount(() => {
        ul = document.getElementById("myUL");
        inputEl = document.getElementById("myInput") as HTMLInputElement | null;
        addBtn = document.querySelector(".addBtn");

        if (!ul || !inputEl || !addBtn) return;

        // Initialize existing list items with close buttons
        Array.from(ul.children).forEach((child) => {
            if (child instanceof HTMLElement) {
                if (!child.querySelector(".close"))
                    child.appendChild(makeCloseButton());
            }
        });

        // Toggle checked class when clicking li (use event delegation)
        ul.addEventListener("click", (ev) => {
            const target = ev.target as HTMLElement;
            const li = target.closest("li");
            if (!li) return;
            if (target.classList.contains("close")) return;
            li.classList.toggle("checked");
        });

        // Attach click handler to the Add button as a fallback
        addBtn.addEventListener("click", newElement as EventListener);

        inputEl.addEventListener("keydown", (e) => {
            if ((e as KeyboardEvent).key === "Enter") newElement();
        });
    });
</script>

<div class="wrapper">
    <div id="myDIV" class="header">
        <h2>My To Do List</h2>
        <input type="text" id="myInput" placeholder="Title..." />
        <span class="addBtn">Add</span>
    </div>

    <ul id="myUL"></ul>
</div>

<style>
    :root {
        --bg: #1e1e1e;
        --panel: #222226;
        --accent: #0e639c;
        --muted: #c5c5c5;
        --danger: #e51400;
    }
    * {
        box-sizing: border-box;
        font-family:
            Segoe UI,
            Roboto,
            Helvetica,
            Arial,
            sans-serif;
    }
    .wrapper {
        min-height: 100vh;
        background: var(--bg);
        align-items: flex-start;
        justify-content: center;
        padding: 18px;
        color: var(--muted);
    }
    #myDIV.header {
        width: 215px;
        background: var(--panel);
        padding: 8px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        gap: 8px;
        border: 1px solid rgba(255, 255, 255, 0.03);
    }
    #myDIV h2 {
        font-size: 1rem;
        margin: 0;
        color: #fff;
        font-weight: 600;
    }
    #myInput {
        flex: 1;
        padding: 8px 10px;
        border-radius: 4px;
        border: 1px solid rgba(255, 255, 255, 0.04);
        background: transparent;
        color: var(--muted);
        outline: none;
    }
    #myInput::placeholder {
        color: rgba(255, 255, 255, 0.4);
    }
    .addBtn {
        background: transparent;
        color: var(--accent);
        padding: 6px 10px;
        border-radius: 4px;
        border: 1px solid transparent;
        cursor: pointer;
    }
    .addBtn:hover {
        background: rgba(14, 99, 156, 0.06);
    }
    #myUL {
        list-style: none;
        padding: 6px 0;
        margin: 10px 0 0 0;
        background: transparent;
        border-radius: 6px;
            font-size: 5rem;

    #myUL li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 12px;
        color: var(--muted);
        border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        transition: background 0.12s;
    }
    #myUL li:hover {
        background: rgba(255, 255, 255, 0.02);
    }
    #myUL li::before {
        content: "";
        width: 16px;
        height: 16px;
        border-radius: 3px;
        border: 1px solid rgba(255, 255, 255, 0.06);
        display: inline-block;
        margin-right: 10px;
        opacity: 0;
        transform: scale(0.95);
        transition: all 0.12s;
    }

    .close {
        background: transparent;
        border: none;
        color: var(--danger);
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        font-weight: 600;
    }
    .close:hover {
        background: rgba(255, 255, 255, 0.02);
    }

</style>
