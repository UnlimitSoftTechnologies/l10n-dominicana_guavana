from odoo import api, fields, models


class ResCompany(models.Model):
    _inherit = 'res.company'

    # The POS only loads the current company, so its parent can't be read as a record
    parent_company_name = fields.Char(related='parent_id.name')

    @api.model
    def _load_pos_data_fields(self, config_id):
        result = super()._load_pos_data_fields(config_id)
        result.append('parent_company_name')
        return result
