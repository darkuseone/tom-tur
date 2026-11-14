"""Звук выпуска 026 — Стамбул: SFX и атмосферы от событий картинки (ev.json). Подпись выпуска — тростниковая флейта ней
(первый звук хука и звук «ПОДПИШИСЬ»), уд — на раскрытиях, дарбука — на переходах; музыка — music_istanbul (уд, ней, дарбука).
Одна концовка: после «отмотаем!» никаких ударов — только затухание музыки."""


def sound(T):
    E, S0, S1, LS, DUR = T.EV, T.S0, T.S1, T.LS, T.DUR
    e = lambda k, d=0.0: E[k] + d
    sfx = [
        # хук: ней, чайки, удар лапой по щиту, красный крест, «Константинополь» подсвечен, вопрос, пуф-дервиш, часы
        ('ney_sting', 0.0, -4), ('ferry_horn', 0.3, -14), ('wood_bonk', e('hk_slap'), -2), ('stamp_thud', e('hk_slap', 0.05), -6), ('pencil_scribble', e('hk_slap', 0.1), -6),
        ('shimmer', e('hk_konst'), -12), ('tiny_tuk', e('hk_q'), -6), ('oud_gliss', e('hk_q', 0.05), -8), ('poof_cloth', e('hk_puff'), -4), ('watch_click', E['h2'], -4), ('rewind', E['h2'] + 0.15, -8),
        # отмотка-дервиш: вихрь, свист оборота, ней, белая вспышка
        ('vortex_suck', S0['tunnel'] - 0.15, -8), ('spin_whoosh', S0['tunnel'] + 0.05, -2), ('time_zoom', S0['tunnel'] + 0.2, -10), ('ney_sting', S0['tunnel'] + 0.4, -10), ('whip_whoosh', S0['tunnel'] + 1.1, -4),
        # VII в. до н. э.: вихрь раскручивается, прибой, глава, кран-журавль, «слепые» — смешок, топот, табличка
        ('silk_swish', S0['byzant'] - 0.05, -6), ('stamp_thud', S0['byzant'] + 0.3, -8), ('darbuka_roll', S0['byzant'] + 0.2, 4), ('rope_creak', e('bz_first', 0.4), -10), ('chisel_strike', e('bz_greek'), -12),
        ('whip_whoosh', e('bz_across', -0.1), -10), ('teleport_pop', e('bz_blind'), -6), ('shiver_brr', e('bz_blind', 0.2), -14), ('rock_knock', e('bz_better'), -2), ('shimmer', e('bz_better', 0.1), -8), ('stamp_thud', e('bz_better', 0.15), -10),
        # 330: монета-солид, глава, «столицей» — трубы и толпа, шнур — покрывало слетает, статуя вспыхивает
        ('coins_pouch', S0['konst'] - 0.1, -6), ('goblet_clink', S0['konst'] + 0.05, -6), ('stamp_thud', S0['konst'] + 0.3, -8), ('medal_fanfare', e('kn_cap'), -8), ('crowd_cheer', e('kn_cap', 0.1), -12),
        ('rope_creak', e('kn_cord', -0.1), -8), ('cloth_rip', e('kn_cord', 0.05), -4), ('silk_swish', e('kn_cord', 0.15), -6), ('shimmer', e('kn_honor'), -4), ('oud_gliss', e('kn_honor', 0.05), -8),
        # 537: смальта, леса, «Софию» — свет купола, кубик на место, штамп «5 лет», «рекорд», отъезд к куполу
        ('shimmer', S0['sofia'] - 0.1, -6), ('chisel_strike', S0['sofia'] + 0.4, -12), ('stone_saw', S0['sofia'] + 0.8, -18), ('rope_creak', e('sf_need'), -12), ('shimmer', e('sf_sofia'), -8),
        ('chisel_strike', e('sf_five', -0.05), -2), ('tiny_tuk', e('sf_five', 0.05), -4), ('stamp_thud', e('sf_five', 0.1), -6), ('medal_fanfare', e('sf_thou'), -12), ('whip_whoosh', e('sf_big', -0.1), -8), ('oud_gliss', e('sf_big'), -8),
        # 1453: цепь рвёт кадр, ночь, пушки вдали, цепь подсвечена, «Ладно» — плевок, канат, галера катится, счётчик, плюх на воду
        ('chain_clank', S0['fall'] - 0.15, -2), ('cloth_rip', S0['fall'] - 0.05, -8), ('war_horn', S0['fall'] + 0.3, -12), ('cannon_boom', S0['fall'] + 0.9, -14), ('cannon_boom', e('fl_mehmed', 0.1), -10),
        ('chain_clank', e('fl_chain'), -4), ('shimmer', e('fl_chain', 0.05), -12), ('poof_cloth', e('fl_ok', -0.3), -16), ('rope_creak', e('fl_ok'), -2), ('rope_creak', e('fl_ok', 0.7), -6), ('boulder_roll', e('fl_ok', 0.2), -8),
        ('tiny_tuk', e('fl_70'), -4), ('metronome_tick', e('fl_70', 0.3), -10), ('dive_splash', e('fl_land'), -6), ('crowd_cheer', e('fl_land', 0.1), -14),
        # ≈1840: ковёр перелетает, глава, «Нет» — пальцем, монета звякает и крутится, «КОСТАНТИНИЙЕ», облачка «Стамбул!»
        ('paper_whoosh', S0['sultan'] - 0.15, -4), ('silk_swish', S0['sultan'], -6), ('stamp_thud', S0['sultan'] + 0.3, -8), ('tiny_tuk', e('su_no'), -6), ('coins_pouch', e('su_coin', -0.05), -2),
        ('goblet_clink', e('su_coin', 0.1), -6), ('shimmer', e('su_name'), -6), ('oud_gliss', e('su_name', 0.05), -8), ('teleport_pop', e('su_st'), -6), ('teleport_pop', e('su_st', 0.2), -8), ('teleport_pop', e('su_st', 0.4), -8), ('crowd_cheer', e('su_st', 0.1), -16), ('tiny_tuk', e('su_people'), -10),
        # 1930: конверт открывается, глава, ответ — колокольчик стойки, телеграф, штамп «İSTANBUL», «обратно отправителю», письмо улетает
        ('paper_whoosh', S0['post'] - 0.1, -4), ('stamp_thud', S0['post'] + 0.3, -8), ('typewriter', S0['post'] + 0.5, -14), ('reception_bell', e('answer'), -2), ('shimmer', e('answer', 0.05), -8),
        ('typewriter', e('ps_post'), -12), ('whip_whoosh', e('ps_stamp', -0.15), -10), ('stamp_thud', e('ps_stamp', 0.02), 0), ('paper_whoosh', e('ps_old'), -8), ('stamp_thud', e('ps_back', -0.03), 0), ('paper_whoosh', e('ps_back', 0.65), -4),
        # 2026: стая чаек, гудок парома, счётчик, «Европа»/«Азия», симит чайке, «< 100 лет»
        ('whip_whoosh', S0['today'] - 0.2, -6), ('ferry_horn', S0['today'] + 0.2, -6), ('tiny_tuk', e('td_16'), -4), ('metronome_tick', e('td_16', 0.3), -10), ('teleport_pop', e('td_eu'), -6), ('teleport_pop', e('td_as'), -6),
        ('whip_whoosh', e('td_as', 0.05), -12), ('stamp_thud', e('td_100'), -6), ('oud_gliss', e('td_100', 0.05), -8),
        # кнопка: чипы-вопросы, на «Пиши» — ПОДПИШИСЬ (ней), подмигивание; после голоса — тишина и затухание
        ('whip_whoosh', S0['button'] - 0.2, -10), ('tiny_tuk', e('bt_q'), -10), ('tiny_tuk', e('bt_st'), -6), ('tiny_tuk', e('bt_kp'), -6), ('teleport_pop', e('endcard'), -4), ('ney_sting', e('endcard', 0.05), -8), ('goblet_clink', e('bt_go'), -8),
    ]
    beds = [('gulls_river_loop', 0, S0['tunnel']), ('bosphorus_dawn_loop', S0['byzant'], S1['byzant']), ('old_square_loop', S0['konst'], S1['konst']), ('masons_loop', S0['sofia'], S1['sofia']),
            ('campfire_loop', S0['fall'], S1['fall']), ('port_night_loop', S0['fall'], S1['fall']), ('bazaar_loop', S0['sultan'], S1['sultan']), ('museum_day_loop', S0['post'], S1['post']),
            ('gulls_river_loop', S0['today'], DUR), ('night_city_loop', S0['today'], DUR)]
    return dict(sfx=sfx, beds=beds, music='music_istanbul', music_duck=[(S0['fall'] - 0.1, S1['fall'], -6)])
