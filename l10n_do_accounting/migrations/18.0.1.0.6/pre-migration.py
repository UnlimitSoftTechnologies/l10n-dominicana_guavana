def migrate(cr, version):
    # The data file is noupdate="0", but records loaded while it was
    # noupdate="1" keep that flag in the DB and -u skips them.
    cr.execute("""
        UPDATE ir_model_data SET noupdate = false
        WHERE model = 'account.fiscal.type' AND module = 'l10n_do_accounting'
    """)
