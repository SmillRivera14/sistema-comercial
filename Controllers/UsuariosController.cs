using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using Sistema_comercial.Models;
using Sistema_comercial.Models.DTOs;

namespace Sistema_comercial.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly SistemaComercialContext _context;
        private readonly ILogger<UsuariosController> _logger;

        public UsuariosController(SistemaComercialContext context, ILogger<UsuariosController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> Get()
        {
            var usuarios = await _context.Usuarios
                .ToListAsync();

            var DTO = usuarios.Select(u => new UsuarioDTO
            {
                Id = u.Id,
                Nombre = u.Nombre,
                Email = u.Email,
                FechaRegistro = u.FechaRegistro
            });

            return Ok(DTO);
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> GetById (int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            var DTO = new Usuario
            {
                Id = usuario.Id,
                Nombre = usuario.Nombre,
                Email = usuario.Email,
                FechaRegistro = usuario.FechaRegistro
            };

            return Ok(DTO);
        }

        [HttpGet("{email}")]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetByName(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("El parámetro email es requerido");
            }

            try
            {
                var mailAddress = new System.Net.Mail.MailAddress(email);
            }
            catch
            {
                return BadRequest("El formato del email no es válido");
            }

            if (email.Length > 200)
            {
                return BadRequest("El email no puede exceder los 200 caracteres");
            }

            try
            {
                var usuarios = await _context.Usuarios
                    .Where(x => x.Email.Contains(email))
                    .Select(u => new UsuarioDTO
                    {
                        Id = u.Id,
                        Nombre = u.Nombre,
                        Email = u.Email,
                        FechaRegistro = u.FechaRegistro
                    })
                    .ToListAsync();

                if (!usuarios.Any())
                {
                    return NotFound("No se encontraron usuarios con ese email");
                }

                return Ok(usuarios);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al buscar usuarios por email");
                return StatusCode(500, $"Error interno al procesar la solicitud\n{ex}");
            }

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Usuario request)
        {
            // Validación básica
            if (id != request.Id)
            {
                return BadRequest("El ID en la URL no coincide con el ID del usuario");
            }

            // Buscar el usuario existente
            var usuarioExistente = await _context.Usuarios.FindAsync(id);

            if (usuarioExistente == null)
            {
                return NotFound("Usuario no encontrado");
            }

            try
            {
                // Crear objeto para actualización
                var usuarioActualizado = new Usuario
                {
                    Id = request.Id,
                    Nombre = request.Nombre,
                    Email = request.Email,
                    FechaRegistro = request.FechaRegistro // Mantener el valor original
                };

                // encriptar la contraseña si se modifica

                if (!string.IsNullOrEmpty(request.PasswordHash))
                {
                    if(!BCrypt.Net.BCrypt.Verify(request.PasswordHash, usuarioExistente.PasswordHash))
                    {
                        // Encriptar nueva contraseña
                        usuarioActualizado.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.PasswordHash);
                    }
                    else
                    {
                        usuarioActualizado.PasswordHash = usuarioExistente.PasswordHash;
                    }
                }
                else
                {
                    usuarioActualizado.PasswordHash = usuarioExistente.PasswordHash;
                }

                    // Copiar solo las propiedades modificables
                    _context.Entry(usuarioExistente).CurrentValues.SetValues(usuarioActualizado);

                // Marcar como modificado (opcional, SetValues ya lo hace)
                _context.Entry(usuarioExistente).State = EntityState.Modified;

                // Guardar cambios
                await _context.SaveChangesAsync();

                return Ok(new 
                {
                    id = usuarioExistente.Id,
                    nombre = usuarioExistente.Nombre,
                    email = usuarioExistente.Email,
                    Registro = usuarioExistente.FechaRegistro
                });
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!UsuarioExists(id))
                {
                    return NotFound("El usuario ya no existe");
                }
                else
                {
                    _logger.LogError(ex, "Error de concurrencia al actualizar usuario");
                    return StatusCode(500, "Error de concurrencia: el registro fue modificado por otro usuario");
                }
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Error al actualizar usuario en la base de datos");
                return StatusCode(500, "Error al guardar los cambios: " + ex.InnerException?.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error inesperado al actualizar usuario");
                return StatusCode(500, $"Error interno del servidor\n{ex}");
            }
        }

        private bool UsuarioExists(int id)
        {
            return _context.Usuarios.Any(e => e.Id == id);
        }
        [HttpDelete]
        public async Task<IActionResult>Delete (int id)
        {
            var user = await _context.Usuarios.FindAsync(id);
            if(user == null)
            {
                return NotFound();
            }

            _context.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
