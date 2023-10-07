<div class="bg-slate-300 p-3 rounded-lg shrink-0">
    <div class="flex items-center justify-center gap-x-2 mb-4">
        <p class="font-bold text-lg">Skills</p>
        <Tooltip
            addToObserverList={(u) => {
                updateTooltips.push(u);
            }}
        >
            <svg
                slot="label"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                ><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                /></svg
            >
            <p slot="description">
                Hover/tap the name to get a general skill description. Hover/tap
                the skill level to get a more detailed description.
            </p>
        </Tooltip>
    </div>
    <div class="flex gap-x-2 gap-y-2 relative">
        <div class="flex flex-col gap-y-2">
            {#each Object.entries(equippedSkills).sort() as [name, level], i}
                {@const skill = skills.find((s) => s["Name"] === name)}
                <Tooltip
                    addToObserverList={(u) => {
                        updateTooltips.push(u);
                    }}
                >
                    <p slot="label" class="bg-slate-100 rounded-lg px-2">
                        {name}
                    </p>
                    <p slot="description">{skill["Description"]}</p>
                </Tooltip>
            {/each}
        </div>
        <div class="flex flex-col gap-y-2">
            {#each Object.entries(equippedSkills).sort() as [name, level], i}
                {@const skill = skills.find((s) => s["Name"] === name)}
                <Tooltip
                    addToObserverList={(u) => {
                        updateTooltips.push(u);
                    }}
                >
                    <p
                        slot="label"
                        class="whitespace-nowrap bg-slate-100 rounded-lg px-2"
                    >
                        {level} / {skill["Maximum Level"]}
                    </p>
                    <ul slot="description">
                        {@const descriptions =
                            skill["Level Descriptions"].split(";")}
                        {@const l = Math.min(level, descriptions.length - 1)}
                        {#each descriptions as d, i}
                            <li class={i !== l - 1 && "text-slate-400"}>
                                {d}
                            </li>
                        {/each}
                    </ul>
                </Tooltip>
            {/each}
        </div>
    </div>
</div>
