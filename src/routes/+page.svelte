<script>
    // import Minus from '../icons/minus-solid.svelte';
    import ToggleButton from "$lib/components/toggle-button.svelte";
    let minus = `<path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>`;
</script>

<div class="flex flex-row h-screen w-screen">
    <div class="flex flex-col justify-center w-1/2">
        <div class="bg-green-200">
            <p>Health: 0</p>
            <p>Defense: 0</p>
            <p>Attack: 0</p>
            <p>Affinity: 0</p>
            <p>Poison: 0</p>
            <p>Paralysis: 0</p>
            <p>Fire: 0</p>
            <p>Water: 0</p>
            <p>Thunder: 0</p>
            <p>Ice: 0</p>
        </div>
        <div class="bg-cyan-200">
            <p>Skills</p>
        </div>
    </div>
    <div class="flex flex-col justify-center w-1/2 bg-pink-200">
        <div>
            <ToggleButton label="Weapon 2"/>
            <button class="bg-slate-400 flex justify-center items-center">
                <svg
                    class="fill-red-500 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512">{@html minus}</svg
                >
                Helm</button
            >
            <button class="bg-slate-400 flex justify-center items-center">
                <svg
                    class="fill-red-500 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512">{@html minus}</svg
                >
                Mail</button
            >
            <button class="bg-slate-400 flex justify-center items-center">
                <svg
                    class="fill-red-500 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512">{@html minus}</svg
                >
                Arms</button
            >
            <button class="bg-slate-400 flex justify-center items-center">
                <svg
                    class="fill-red-500 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512">{@html minus}</svg
                >
                Waist</button
            >
            <button class="bg-slate-400 flex justify-center items-center rounded-sm">
                <svg
                    class="fill-red-500 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512">{@html minus}</svg
                >
                Legs
            </button>
        </div>
    </div>
</div>
