<div
    class="flex flex-col w-full max-w-screen-lg min-h-[838px] bg-slate-300 rounded-lg mt-3"
  >
    <div class="flex px-3 pt-3 gap-x-3">
      <button
        class="px-2 bg-slate-100 rounded-md hover:bg-slate-400"
        on:click={() => {
          isShowMoreOptions = !isShowMoreOptions;
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 128 512"
          ><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
            d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"
          /></svg
        >
      </button>

      <input
        class="grow rounded-md px-2 py-1 text-xl"
        bind:value={searchText}
        type="text"
        placeholder="Search name, skills, monster..."
      />
    </div>
    {#if isShowMoreOptions}
      <div
        transition:slide={{
          delay: 10,
          duration: 300,
          easing: quintOut,
          axis: "y",
        }}
        class="grid grid-cols-3 md:grid-cols-6 py-2 px-3 gap-x-3"
      >
        <div class="col-span-1 flex flex-col rounded-md border-slate-300">
          <label
            class="whitespace-nowrap w-full bg-slate-300 p-1 font-bold text-sm"
            for="weapon-grade">Weapon Grade</label
          >
          <GradeButton
            grade={selectedWeaponGrade}
            onDecrease={() => {
              selectedWeaponGrade--;
            }}
            onIncrease={() => {
              selectedWeaponGrade++;
            }}
            min={selectedWeapon["Minimum Grade"]}
            max={10}
          />
        </div>
        <div class="col-span-1 flex flex-col rounded-md border-slate-300">
          <label
            class="whitespace-nowrap w-full bg-slate-300 p-1 font-bold text-sm"
            for="helm-grade">Helm Grade</label
          >
          <GradeButton
            grade={selectedHelmGrade}
            onDecrease={() => {
              selectedHelmGrade--;
            }}
            onIncrease={() => {
              selectedHelmGrade++;
            }}
            min={1}
            max={10}
          />
        </div>
        <div class="col-span-1 flex flex-col rounded-md border-slate-300">
          <label
            class="whitespace-nowrap w-full bg-slate-300 p-1 font-bold text-sm"
            for="mail-grade">Mail Grade</label
          >
          <GradeButton
            grade={selectedMailGrade}
            onDecrease={() => {
              selectedMailGrade--;
            }}
            onIncrease={() => {
              selectedMailGrade++;
            }}
            min={1}
            max={10}
          />
        </div>
        <div class="col-span-1 flex flex-col rounded-md border-slate-300">
          <label
            class="whitespace-nowrap w-full bg-slate-300 p-1 font-bold text-sm"
            for="arms-grade">Arms Grade</label
          >
          <GradeButton
            grade={selectedArmsGrade}
            onDecrease={() => {
              selectedArmsGrade--;
            }}
            onIncrease={() => {
              selectedArmsGrade++;
            }}
            min={1}
            max={10}
          />
        </div>
        <div class="col-span-1 flex flex-col rounded-md border-slate-300">
          <label
            class="whitespace-nowrap w-full bg-slate-300 p-1 font-bold text-sm"
            for="waist-grade">Waist Grade</label
          >
          <GradeButton
            grade={selectedWaistGrade}
            onDecrease={() => {
              selectedWaistGrade--;
            }}
            onIncrease={() => {
              selectedWaistGrade++;
            }}
            min={1}
            max={10}
          />
        </div>
        <div class="col-span-1 flex flex-col rounded-md border-slate-300">
          <label
            class="whitespace-nowrap w-full bg-slate-300 p-1 font-bold text-sm"
            for="legs-grade">Legs Grade</label
          >
          <GradeButton
            grade={selectedLegsGrade}
            onDecrease={() => {
              selectedLegsGrade--;
            }}
            onIncrease={() => {
              selectedLegsGrade++;
            }}
            min={1}
            max={10}
          />
        </div>
      </div>
    {/if}
    <div class="flex gap-x-3 gap-y-2 p-3 flex-wrap">
      <select
        class="rounded-md px-2 hover:ring-slate-400 hover:ring-2"
        bind:value={selectedWeaponCategory}
      >
        <option class="hover:bg-slate-400" value="Sword and Shield"
          >Sword and Shield</option
        >
        <option value="Hammer">Hammer</option>
        <option value="Great Sword">Great Swords</option>
        <option value="Long Sword">Long Sword</option>
        <option value="Bow">Bow</option>
        <option value="Light Bow Gun">Light Bow Gun</option>
      </select>
      <CheckBox label={"Weapon"} bind:isEnabled={isWeaponEnabled} />
      <CheckBox label={"Helm"} bind:isEnabled={isHelmEnabled} />
      <CheckBox label={"Mail"} bind:isEnabled={isMailEnabled} />
      <CheckBox label={"Arms"} bind:isEnabled={isArmsEnabled} />
      <CheckBox label={"Waist"} bind:isEnabled={isWaistEnabled} />
      <CheckBox label={"Legs"} bind:isEnabled={isLegsEnabled} />
    </div>
    <div class="flex flex-col gap-y-2 pt-2 border-t-2 border-slate-500">
      {#if isWeaponEnabled}
        <SelectWeapon
          list={displayedWeaponCategory}
          title={selectedWeaponCategory}
          nameKey={"Tree"}
          valueKey={"Equipment Skills"}
          selectedGrade={selectedWeaponGrade}
          bind:selectedValue={selectedWeapon}
          filter={searchText}
        />
      {/if}
      {#if isHelmEnabled}
        <SelectWeapon
          list={armors}
          title="Helm"
          nameKey={"Tree"}
          valueKey={"Helm Skills"}
          selectedGrade={selectedHelmGrade}
          bind:selectedValue={selectedHelm}
          filter={searchText}
        />
      {/if}
      {#if isMailEnabled}
        <SelectWeapon
          list={armors}
          title="Mail"
          nameKey={"Tree"}
          valueKey={"Mail Skills"}
          selectedGrade={selectedMailGrade}
          bind:selectedValue={selectedMail}
          filter={searchText}
        />
      {/if}
      {#if isArmsEnabled}
        <SelectWeapon
          list={armors}
          title="Arms"
          nameKey={"Tree"}
          valueKey={"Arms Skills"}
          selectedGrade={selectedArmsGrade}
          bind:selectedValue={selectedArms}
          filter={searchText}
        />
      {/if}
      {#if isWaistEnabled}
        <SelectWeapon
          list={armors}
          title="Waist"
          nameKey={"Tree"}
          valueKey={"Waist Skills"}
          selectedGrade={selectedWaistGrade}
          bind:selectedValue={selectedWaist}
          filter={searchText}
        />
      {/if}
      {#if isLegsEnabled}
        <SelectWeapon
          list={armors}
          title="Legs"
          nameKey={"Tree"}
          valueKey={"Legs Skills"}
          selectedGrade={selectedLegsGrade}
          bind:selectedValue={selectedLegs}
          filter={searchText}
        />
      {/if}
    </div>
  </div>