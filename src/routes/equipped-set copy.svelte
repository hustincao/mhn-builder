<div class="bg-slate-300 p-3 rounded-lg grow">
    <p class="text-center font-bold text-lg mb-4">Equipped Set</p>
    <div class="grid grid-cols-2 gap-x-2 gap-y-2">
      {#if selectedWeapon.hasOwnProperty("Tree")}
        <ArmorButton
          armorName={selectedWeapon["Tree"]}
          armorSkills={selectedWeapon["Equipment Skills"]}
          element={selectedWeapon["Element"] !== "None"
            ? selectedWeapon["Element"]
            : ""}
          isSelected={true}
          selectedGrade={selectedWeaponGrade}
        />
      {/if}
      {#if selectedHelm.hasOwnProperty("Tree")}
        <ArmorButton
          armorName={selectedHelm["Tree"]}
          armorSkills={selectedHelm["Helm Skills"]}
          element={""}
          isSelected={true}
          selectedGrade={selectedHelmGrade}
        />
      {/if}

      {#if selectedMail.hasOwnProperty("Tree")}
        <ArmorButton
          armorName={selectedMail["Tree"]}
          armorSkills={selectedMail["Mail Skills"]}
          element={""}
          isSelected={true}
          selectedGrade={selectedMailGrade}
        />
      {/if}

      {#if selectedArms.hasOwnProperty("Tree")}
        <ArmorButton
          armorName={selectedArms["Tree"]}
          armorSkills={selectedArms["Arms Skills"]}
          element={""}
          isSelected={true}
          selectedGrade={selectedArmsGrade}
        />
      {/if}

      {#if selectedWaist.hasOwnProperty("Tree")}
        <ArmorButton
          armorName={selectedWaist["Tree"]}
          armorSkills={selectedWaist["Waist Skills"]}
          element={""}
          isSelected={true}
          selectedGrade={selectedWaistGrade}
        />
      {/if}

      {#if selectedLegs.hasOwnProperty("Tree")}
        <ArmorButton
          armorName={selectedLegs["Tree"]}
          armorSkills={selectedLegs["Legs Skills"]}
          element={""}
          isSelected={true}
          selectedGrade={selectedLegsGrade}
        />
      {/if}
    </div>
  </div>