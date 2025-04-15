package gal.iesteis.backend.empresa;

import java.util.Set;

import gal.iesteis.backend.concello.Concello;
import gal.iesteis.backend.especialidad.Especialidad;
import gal.iesteis.backend.skill.Skill;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "empresas")
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", length = 500, nullable = false)
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "concello_id", nullable = false, foreignKey = @ForeignKey(name = "fk_empresas_concello"))
    private Concello concello;

    @Column(name = "direccion", length = 500, nullable = false)
    private String direccion;

    @Column(name = "observaciones", columnDefinition = "TEXT")
    private String observaciones;

    @ManyToOne
    @JoinColumn(name = "especialidad_id", nullable = false, foreignKey = @ForeignKey(name = "fk_empresas_especialidad"))
    private Especialidad especialidad;

    @Column(name = "contacto_nombre", length = 500)
    private String contactoNombre;

    @Column(name = "contacto_email", length = 500)
    private String contactoEmail;

    @Column(name = "contacto_telefono", length = 500)
    private String contactoTelefono;

    @Column(name = "activa", nullable = false)
    private Boolean activa;

    @Column(name = "plazas", columnDefinition = "DEFAULT 0")
    private Short plazas;

    @ManyToMany
    @JoinTable(name = "empresas_skills", joinColumns = @JoinColumn(name = "empresa_id"), inverseJoinColumns = @JoinColumn(name = "skill_id"))
    private Set<Skill> skills;
}
