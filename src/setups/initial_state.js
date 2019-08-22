let initial_state = {
    wallet_exists: false,
    error: false,
    is_guest: true,
    active_account: {},
    accounts: {},
    history: [],
    contacts: { contacts: [], contact_counter: -1, new_contact: { address: "", label: "" } },
    legacy_wallet: {},
    wizard: {
        step: 1, data: {
            keys_modal: false,
            restore_filepath: '',
            restore_password: '',
            create_filepath: '',
            create_password: '',
            create_confirm_password: '',
            create_wallet_name: '',
            validated: false
        }, errors: {}, touched: {}
    },
    legacy_accounts: {},
    home_modals: { modal_seeds: false, modal_keys: false, modal_edit: false, modal_file: false, modal_new: false },
    account_labels: {}
};

export { initial_state }