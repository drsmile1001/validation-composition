<template>
    <div class="home">
        <h1>表單</h1>
        <form>
            <label>姓名</label>
            <input
                v-model="name"
                @input="touch('name')"
                @blur="touch('name')"
            />
            <span class="error-message">{{ touchedErrors.get("name") }}</span>
            <label>年齡</label>
            <input
                type="number"
                v-model="age"
                @input="touch('age')"
                @blur="touch('age')"
            />
            <span class="error-message">{{ touchedErrors.get("age") }}</span>
            <button type="button" @click="submit">送出</button>
            <button type="button" @click="clear">清除</button>
        </form>
    </div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    reactive,
    toRefs,
} from "@vue/composition-api"
import { useForm, ValidatedField } from "@/Utilities/Validator"

export default defineComponent({
    setup() {
        const state = reactive({
            name: "",
            age: null as number | null,
        })

        const { errors, touch, touchedErrors, clear, validateAll } = useForm(
            computed(() => ({
                fields: [
                    {
                        name: "name",
                        value: state.name,
                        validator: (value) => !!value,
                        errorHint: "必填",
                    } as ValidatedField<string>,
                    {
                        name: "age",
                        value: state.age,
                        validator: (value) => value !== null && value > 18,
                        errorHint: "必填且大於18",
                    } as ValidatedField<number>,
                ],
            }))
        )

        function submit() {
            const valid = validateAll()
            if (valid) alert("送出")
            else alert("有錯")
        }

        return {
            ...toRefs(state),
            errors,
            touch,
            touchedErrors,
            submit,
            clear,
        }
    },
})
</script>

<style>
.home .error-message {
    color: red;
}
</style>