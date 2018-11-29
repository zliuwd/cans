import PropTypes from 'prop-types'

export const clientPropTypes = PropTypes.shape({
  person_role: PropTypes.string,
  first_name: PropTypes.string,
  middle_name: PropTypes.string,
  last_name: PropTypes.string,
  suffix: PropTypes.string,
  dob: PropTypes.string,
  external_id: PropTypes.string,
  county: PropTypes.shape({
    export_id: PropTypes.string,
    external_id: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
  }),
})

export const changeHistoryPropType = PropTypes.shape({
  assessment_change_type: PropTypes.string,
  change_type: PropTypes.string,
  changed_at: PropTypes.string,
  changes: PropTypes.array,
  entity_id: PropTypes.number,
  id: PropTypes.number,
  user_id: PropTypes.string,
})
