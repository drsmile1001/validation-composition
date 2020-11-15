import { computed, reactive, Ref } from "@vue/composition-api"

export interface ValidatedForm {
    fields: ValidatedField<any>[]
}

export interface ValidatedField<T> {
    name: string
    value: T
    validator: (value: T) => boolean
    errorHint: string
}

export function useForm(form: Ref<ValidatedForm>) {
    const state = reactive({
        dirtedFields: new Set<string>(),
    })

    function touch(name: string) {
        state.dirtedFields.add(name)
        state.dirtedFields = new Set(state.dirtedFields.values())
    }

    function clear() {
        state.dirtedFields = new Set<string>()
    }

    function validateAll() {
        state.dirtedFields = new Set(
            form.value.fields.map(field => field.name)
        )
        return Array.from(errors.value.values()).every(field => field === null)
    }

    const errors = computed(
        () =>
            new Map(
                form.value.fields.map(field => [
                    field.name,
                    field.validator(field.value) !== true
                        ? field.errorHint
                        : null,
                ])
            )
    )

    const touchedErrors = computed(
        () =>
            new Map(
                Array.from(errors.value.entries()).filter(([key, _value]) =>
                    state.dirtedFields.has(key)
                )
            )
    )

    return {
        touch,
        clear,
        validateAll,
        errors,
        touchedErrors,
    }
}
